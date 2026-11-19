/* Visor 3D del personalizador (three.js, ES module).
   Expone BP.viewer3d. Se carga solo en personalizar.html.
   - Arrastra fuera del diseño: gira la prenda.
   - Arrastra el diseño: lo mueve sobre la superficie.
   - Toca la prenda: ubica el diseño en ese punto (pecho, espalda, mangas…). */
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DecalGeometry } from 'three/addons/geometries/DecalGeometry.js';

const BP = (window.BP = window.BP || {});
const host = document.getElementById('stage3d');

const H = 3; // alto normalizado del modelo (unidades de escena)
const st = { pos: null, normal: null, scale: 80, rot: 0, tex: null, aspect: 1 };
let renderer, scene, camera, controls, root, shirt, decal, ready = false, color = '#111113';
const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();

function render() { if (renderer) renderer.render(scene, camera); }

function init() {
  if (ready) return;
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.domElement.style.cssText = 'width:100%;height:auto;aspect-ratio:1;display:block;touch-action:none;cursor:grab;border-radius:8px';
  host.appendChild(renderer.domElement);
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0.3, 6.4);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x8a8478, 1.5));
  const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(3, 4, 5); scene.add(key);
  const back = new THREE.DirectionalLight(0xffffff, 1.4); back.position.set(-3, 2, -5); scene.add(back);
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false; controls.minDistance = 3.6; controls.maxDistance = 9;
  controls.minPolarAngle = 0.35; controls.maxPolarAngle = 2.35;
  controls.addEventListener('change', render);
  new ResizeObserver(resize).observe(host);
  bindPointer();
  ready = true;
  resize();
}

function resize() {
  if (!renderer) return;
  const w = Math.max(200, host.clientWidth - 0);
  renderer.setSize(w, w, false);
  render();
}

function load(url) {
  try { init(); } catch (e) { return Promise.reject(e); }
  if (root && root.userData.url === url) return Promise.resolve();
  return new Promise((ok, fail) => {
    new GLTFLoader().load(url, gltf => {
      if (root) scene.remove(root);
      root = gltf.scene; root.userData.url = url;
      let mesh = null; root.traverse(o => { if (o.isMesh && !mesh) mesh = o; });
      if (!mesh) { fail(new Error('Modelo sin malla')); return; }
      const box = new THREE.Box3().setFromObject(root), size = box.getSize(new THREE.Vector3()), c = box.getCenter(new THREE.Vector3());
      const k = H / size.y;
      root.rotation.y = Math.PI; // este modelo trae el frente hacia -Z: lo giramos para ver el frente al cargar
      root.scale.setScalar(k); root.position.copy(c.multiplyScalar(-k)); root.position.x *= -1; root.position.z *= -1;
      shirt = mesh;
      shirt.material = new THREE.MeshStandardMaterial({ color, roughness: 0.9, metalness: 0, side: THREE.DoubleSide });
      scene.add(root); scene.updateMatrixWorld(true);
      st.pos = null; clearDecal();
      if (st.tex) place(defaultSpot());
      controls.target.set(0, 0, 0); controls.update(); render(); ok();
    }, undefined, fail);
  });
}

/* ---------- superficie / ubicación ---------- */
function worldNormal(hit) {
  const n = hit.face.normal.clone().transformDirection(hit.object.matrixWorld);
  if (n.dot(ray.ray.direction) > 0) n.negate(); // siempre hacia la cámara/rayo
  return n.normalize();
}
function defaultSpot() { // pecho, mirando al frente
  ray.set(new THREE.Vector3(0, 0.35, 10), new THREE.Vector3(0, 0, -1));
  const h = ray.intersectObject(shirt, false)[0];
  return h ? { p: h.point, n: worldNormal(h) } : { p: new THREE.Vector3(0, 0.35, 0.7), n: new THREE.Vector3(0, 0, 1) };
}
function place(s) { st.pos = s.p.clone(); st.normal = s.n.clone(); buildDecal(); }

function clearDecal() { if (decal) { scene.remove(decal); decal.geometry.dispose(); decal.material.dispose(); decal = null; } }
function buildDecal() {
  clearDecal();
  if (!st.tex || !st.pos || !shirt) { render(); return; }
  const w = 1.15 * (st.scale / 100), h = w / st.aspect;
  const dummy = new THREE.Object3D();
  dummy.position.copy(st.pos); dummy.lookAt(st.pos.clone().add(st.normal));
  dummy.rotateZ(THREE.MathUtils.degToRad(st.rot));
  const geo = new DecalGeometry(shirt, st.pos, dummy.rotation, new THREE.Vector3(w, h, 0.9));
  const mat = new THREE.MeshStandardMaterial({ map: st.tex, transparent: true, roughness: 0.85, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4 });
  decal = new THREE.Mesh(geo, mat); scene.add(decal); render();
}

/* ---------- puntero: girar / mover diseño / ubicar ---------- */
function setNdc(e) { const r = renderer.domElement.getBoundingClientRect(); ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1); ray.setFromCamera(ndc, camera); }
function hitShirt(e) { setNdc(e); const h = ray.intersectObject(shirt, false)[0]; return h ? { p: h.point, n: worldNormal(h) } : null; }
function bindPointer() {
  const el = renderer.domElement; let dragging = false, down = null, moved = false;
  el.addEventListener('pointerdown', e => {
    down = { x: e.clientX, y: e.clientY }; moved = false; dragging = false;
    if (decal) { setNdc(e); if (ray.intersectObject(decal, false).length) { dragging = true; controls.enabled = false; el.style.cursor = 'move'; } }
  }, true);
  el.addEventListener('pointermove', e => {
    if (!down) return;
    if (Math.hypot(e.clientX - down.x, e.clientY - down.y) > 5) moved = true;
    if (dragging && moved) { const s = hitShirt(e); if (s) place(s); }
  });
  const end = e => {
    if (!down) return;
    if (!dragging && !moved && st.tex && e.type === 'pointerup') { const s = hitShirt(e); if (s) place(s); }
    dragging = false; down = null; controls.enabled = true; el.style.cursor = 'grab';
  };
  el.addEventListener('pointerup', end);
  el.addEventListener('pointercancel', end);
}

/* ---------- API ---------- */
BP.viewer3d = {
  load,
  show(on) { host.hidden = !on; if (on) resize(); },
  setColor(hex) { color = hex; if (shirt) { shirt.material.color.set(hex); render(); } },
  setImage(img) {
    if (st.tex) st.tex.dispose();
    const t = new THREE.Texture(img); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; t.needsUpdate = true;
    st.tex = t; st.aspect = (img.naturalWidth || img.width) / (img.naturalHeight || img.height) || 1;
    if (!st.pos && shirt) place(defaultSpot()); else buildDecal();
  },
  removeImage() { if (st.tex) st.tex.dispose(); st.tex = null; clearDecal(); render(); },
  setScale(v) { st.scale = v; buildDecal(); },
  setRotation(v) { st.rot = v; buildDecal(); },
  center() { if (shirt) { camera.position.set(0, 0.3, 6.4); controls.target.set(0, 0, 0); controls.update(); if (st.tex) place(defaultSpot()); } },
  snapshot() { render(); return renderer.domElement.toDataURL('image/png'); }
};
window.dispatchEvent(new Event('bp3d-ready'));

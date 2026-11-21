(function (BP) {
  const { $, $$ } = BP, cv = $('#cv'), ctx = cv.getContext('2d');
  const prods = ['camiseta-clasica', 'hoodie-clasico', 'hoodie-sin-capucha', 'gorra-trucker', 'taza-ceramica', 'termo-acero', 'tote-bag'].map(BP.getProduct);
  const st = { p: BP.getProduct(BP.param('p')) || prods[0], ci: 0, x: 0, y: 0, s: 80, r: 0, img: null };
  if (!prods.includes(st.p)) prods.unshift(st.p);

  const pathCache = {};
  const P = d => pathCache[d] || (pathCache[d] = new Path2D(d));
  const K = cv.width / 200; // escala viewBox 200 → canvas

  /* ---- Modo 3D (productos con modelo .glb); el resto usa el canvas 2D ---- */
  let use3d = false;
  const stage3d = $('#stage3d');
  function mode() {
    cv.style.display = use3d ? 'none' : '';
    stage3d.hidden = !use3d;
    $('#pzHint').textContent = use3d
      ? 'Arrastra el diseño para moverlo, toca la prenda para ubicarlo en otra parte y arrastra fuera del diseño para girar la prenda.'
      : 'Arrastra el diseño sobre la prenda para moverlo.';
  }
  function sync3d() {
    if (!st.p.model || !BP.viewer3d) { use3d = false; mode(); return; }
    const box = stage3d.parentElement; box.classList.add('loading'); use3d = true; mode();
    BP.viewer3d.load(st.p.model).then(() => {
      box.classList.remove('loading');
      use3d = true; mode();
      BP.viewer3d.setColor(st.p.colors[st.ci].hex);
      if (st.img) BP.viewer3d.setImage(st.img); else BP.viewer3d.removeImage();
      BP.viewer3d.setScale(st.s); BP.viewer3d.setRotation(st.r);
    }).catch(() => { box.classList.remove('loading'); use3d = false; mode(); BP.toast('No pudimos cargar el modelo 3D; usamos la vista 2D'); });
  }
  window.addEventListener('bp3d-ready', sync3d);

  function area() { const a = BP.shapes[st.p.shape].print; return { x: a.x * K, y: a.y * K, w: a.w * K, h: a.h * K }; }
  function center() { const a = area(); st.x = a.x + a.w / 2; st.y = a.y + a.h / 2; }

  function draw() {
    const hex = st.p.colors[st.ci].hex, s = BP.shapes[st.p.shape], light = BP.lum(hex) > 0.6;
    const edge = BP.shade(hex, light ? -38 : 34);
    ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.save(); ctx.scale(K, K);
    ctx.fillStyle = 'rgba(0,0,0,.12)'; ctx.beginPath(); ctx.ellipse(100, 192, 62, 5, 0, 0, 7); ctx.fill();
    (s.stroke || []).forEach(d => { ctx.strokeStyle = edge; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.stroke(P(d)); });
    if (st.p.shape === 'hoodie') { ctx.fillStyle = BP.shade(hex, light ? -22 : 18); ctx.fill(P(s.extra[0])); }
    ctx.lineWidth = 1.5; ctx.lineJoin = 'round';
    s.body.forEach(d => { ctx.fillStyle = hex; ctx.fill(P(d)); ctx.strokeStyle = edge; ctx.stroke(P(d)); });
    if (s.extra && st.p.shape !== 'hoodie') s.extra.forEach(d => { ctx.fillStyle = BP.shade(hex, light ? -26 : 22); ctx.fill(P(d)); ctx.strokeStyle = edge; ctx.stroke(P(d)); });
    if (st.p.shape === 'hoodie') { ctx.fillStyle = BP.shade(hex, light ? -14 : 10); ctx.fill(P(s.extra[1])); ctx.stroke(P(s.extra[1])); }
    const g = ctx.createLinearGradient(0, 0, 200, 200); g.addColorStop(0, 'rgba(255,255,255,.16)'); g.addColorStop(.55, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(0,0,0,.18)');
    s.body.forEach(d => { ctx.fillStyle = g; ctx.fill(P(d)); });
    ctx.restore();
    const a = area();
    if (st.img) {
      ctx.save(); ctx.beginPath(); ctx.rect(a.x - 6 * K, a.y - 6 * K, a.w + 12 * K, a.h + 12 * K); ctx.clip();
      const r = Math.min(a.w / st.img.width, a.h / st.img.height) * (st.s / 100);
      ctx.translate(st.x, st.y); ctx.rotate(st.r * Math.PI / 180); ctx.drawImage(st.img, -st.img.width * r / 2, -st.img.height * r / 2, st.img.width * r, st.img.height * r);
      ctx.restore();
    } else {
      ctx.setLineDash([10, 8]); ctx.strokeStyle = light ? 'rgba(0,0,0,.45)' : 'rgba(255,255,255,.55)'; ctx.lineWidth = 3; ctx.strokeRect(a.x, a.y, a.w, a.h); ctx.setLineDash([]);
      ctx.fillStyle = light ? 'rgba(0,0,0,.55)' : 'rgba(255,255,255,.7)'; ctx.font = '700 26px Inter, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('Tu diseño aquí', a.x + a.w / 2, a.y + a.h / 2 + 8);
    }
  }
  function ui() {
    $('#pzProd').innerHTML = prods.map(p => `<button type="button" class="chip" data-id="${p.id}" aria-pressed="${p === st.p}">${p.short || p.name.split(' ').slice(0, 2).join(' ')}</button>`).join('');
    $('#pzColors').innerHTML = st.p.colors.map((c, i) => `<button type="button" style="background:${c.hex}" data-i="${i}" aria-label="${c.n}" aria-pressed="${i === st.ci}"></button>`).join('');
    $('#pzProdLink').href = 'producto-' + st.p.id + '.html';
  }
  $('#pzProd').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; st.p = BP.getProduct(b.dataset.id); st.ci = 0; center(); ui(); draw(); sync3d(); });
  $('#pzColors').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; st.ci = +b.dataset.i; ui(); draw(); if (use3d) BP.viewer3d.setColor(st.p.colors[st.ci].hex); });
  $('#pzFile').addEventListener('change', e => {
    const f = e.target.files[0]; if (!f) return;
    if (f.size > 8 * 1024 * 1024) { BP.toast('El archivo supera 8 MB'); return; }
    const url = URL.createObjectURL(f), im = new Image();
    im.onload = () => { st.img = im; center(); $('#pzCtl').hidden = false; draw(); if (use3d) BP.viewer3d.setImage(im); URL.revokeObjectURL(url); };
    im.onerror = () => BP.toast('No pudimos leer esa imagen');
    im.src = url;
  });
  $('#pzScale').oninput = e => { st.s = +e.target.value; draw(); if (use3d) BP.viewer3d.setScale(st.s); };
  $('#pzRot').oninput = e => { st.r = +e.target.value; draw(); if (use3d) BP.viewer3d.setRotation(st.r); };
  $('#pzCenter').onclick = () => { center(); draw(); if (use3d) BP.viewer3d.center(); };
  $('#pzRemove').onclick = () => { st.img = null; $('#pzCtl').hidden = true; $('#pzFile').value = ''; draw(); if (use3d) BP.viewer3d.removeImage(); };

  // arrastrar
  let drag = null;
  const pos = e => { const r = cv.getBoundingClientRect(); return { x: (e.clientX - r.left) * cv.width / r.width, y: (e.clientY - r.top) * cv.height / r.height }; };
  cv.addEventListener('pointerdown', e => { if (!st.img) return; const p = pos(e); drag = { dx: st.x - p.x, dy: st.y - p.y }; cv.setPointerCapture(e.pointerId); });
  cv.addEventListener('pointermove', e => { if (!drag) return; const p = pos(e); st.x = p.x + drag.dx; st.y = p.y + drag.dy; draw(); });
  cv.addEventListener('pointerup', () => drag = null);

  $('#pzDl').onclick = () => { if (!st.img) { BP.toast('Sube tu diseño primero'); return; } const a = document.createElement('a'); a.download = 'vista-previa-brutalprint.png'; a.href = use3d ? BP.viewer3d.snapshot() : cv.toDataURL('image/png'); a.click(); BP.toast('Vista previa descargada ✔'); };
  /* ---- Pedir por WhatsApp ----
     1) "Pedir con esta vista previa": sube la imagen y manda un ENLACE en el mensaje; abre directo el chat de Brutal Print
        (no hace falta tener el número guardado).
     2) "Enviar imagen adjunta" (solo celulares compatibles): menú de compartir del teléfono, la imagen va adjunta. */
  function dataUrlToFile(url, name) { // síncrono, para no perder el gesto del usuario (iOS)
    const [head, b64] = url.split(','), mime = (head.match(/:(.*?);/) || [])[1] || 'image/png', bin = atob(b64), u8 = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
    return new File([u8], name, { type: mime });
  }
  const previewFile = () => { try { return dataUrlToFile(use3d ? BP.viewer3d.snapshot() : cv.toDataURL('image/png'), 'vista-previa-brutalprint.png'); } catch (e) { return null; } };
  const waText = link => `Hola Brutal Print, armé una vista previa en el personalizador:\n• Producto: ${st.p.name} (${st.p.colors[st.ci].n})\n• Cantidad: ${+$('#pzQty').value || 1}\n` +
    (link ? `• Vista previa: ${link}\nTe envío mi archivo de diseño original por aquí.` : 'Te adjunto mi diseño y la imagen de la vista previa.');
  const canShareFile = () => { try { return !!(navigator.canShare && navigator.canShare({ files: [new File(['x'], 'a.png', { type: 'image/png' })] })); } catch (e) { return false; } };
  const download = f => { const a = document.createElement('a'); a.download = f.name; a.href = URL.createObjectURL(f); a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); };
  const goWa = (w, url) => { if (w && !w.closed) { w.location.href = url; } else { location.href = url; } };

  const shareBtn = $('#pzShare');
  if (shareBtn && canShareFile()) shareBtn.hidden = false;

  $('#pzWa').onclick = function () {
    BP.track('lead', { source: 'personalizador' });
    if (!st.img) { window.open(BP.wa(waText()), '_blank', 'noopener'); return; }
    const file = previewFile();
    if (!file) { window.open(BP.wa(waText()), '_blank', 'noopener'); return; }
    const btn = this, label = btn.innerHTML;
    const w = window.open('', '_blank'); // se reserva la pestaña dentro del gesto; luego se redirige a WhatsApp
    if (w) { try { w.opener = null; } catch (e) { /* nada */ } }
    btn.disabled = true; btn.textContent = 'Preparando tu vista previa…';
    fetch('/api/vista', { method: 'POST', headers: { 'content-type': file.type }, body: file })
      .then(r => { if (!r.ok) throw new Error('upload'); return r.json(); })
      .then(d => goWa(w, BP.wa(waText(d.url))))
      .catch(() => { // sin enlace: se descarga la imagen y se abre el chat con el texto
        download(file); BP.toast('No pudimos generar el enlace: se descargó la imagen, adjúntala en WhatsApp');
        goWa(w, BP.wa(waText()));
      })
      .finally(() => { btn.disabled = false; btn.innerHTML = label; });
  };

  if (shareBtn) shareBtn.onclick = () => {
    if (!st.img) { BP.toast('Sube tu diseño primero'); return; }
    const file = previewFile(); if (!file) return;
    BP.track('lead', { source: 'personalizador_compartir' });
    navigator.share({ files: [file], text: waText() }).then(() => BP.toast('Elige a Brutal Print en WhatsApp ✔')).catch(err => {
      if (!err || err.name === 'AbortError') return;
      download(file); BP.toast('Vista previa descargada: adjúntala en WhatsApp');
    });
    BP.toast('Elige WhatsApp y el contacto ' + BP.config.whatsappDisplay);
  };
  center(); ui(); draw(); sync3d();
})(window.BP);

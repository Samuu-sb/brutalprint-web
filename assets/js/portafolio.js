/* Portafolio comprable: botones Agregar / Comprar en cada tarjeta y panel "Comprar" al tocar la foto. */
(function (BP) {
  const { $, $$, esc } = BP;
  const grid = $('.port'); if (!grid) return;

  const dlg = document.createElement('dialog');
  dlg.className = 'buydlg'; dlg.setAttribute('aria-labelledby', 'bdTitle');
  document.body.appendChild(dlg);
  let cur = null; // estado del panel abierto


  const lineFor = (p, o) => ({ id: p.id, color: p.colors[o.ci].n, size: p.sizes.length > 1 ? o.size : '', tech: o.tech, qty: Math.max(1, o.qty | 0), note: 'Diseño del portafolio: ' + o.title });
  function add(p, o) {
    BP.cart.add(lineFor(p, o));
    BP.track('add_to_cart', { content_name: p.name, value: BP.unitPrice(p) * o.qty, currency: 'USD' });
  }
  function techOf(fig, p) {
    const map = { 'DTF': 'dtf', 'Serigrafía': 'serigrafia', 'Impresión 3D': 'impresion3d' };
    const t = map[fig.dataset.tech]; return p.techs.includes(t) ? t : p.techs[0];
  }
  const base = fig => { const p = BP.getProduct(fig.dataset.pid); return { p, ci: 0, size: BP.defaultSize(p), qty: 1, tech: techOf(fig, p), title: fig.dataset.title, img: fig.dataset.img }; };

  grid.addEventListener('click', e => {
    const fig = e.target.closest('figure'); if (!fig) return;
    if (e.target.closest('[data-add]')) { add(...(o => [o.p, o])(base(fig))); BP.toast('Agregado al carrito ✔'); return; }
    if (e.target.closest('[data-buy]')) { add(...(o => [o.p, o])(base(fig))); location.href = 'carrito.html'; return; }
    if (e.target.closest('[data-open]')) open(fig);
  });

  function open(fig) {
    cur = base(fig); paint(); dlg.showModal();
  }
  function paint() {
    const c = cur, p = c.p, total = BP.unitPrice(p) * c.qty;
    dlg.innerHTML = `<div class="bd-grid">
  <div class="bd-img"><img src="assets/img/portafolio/${c.img}.webp" alt="${esc(c.title)}"></div>
  <div class="bd-body">
    <button type="button" class="bd-x" data-x aria-label="Cerrar">✕</button>
    <span class="eyebrow">Comprar</span>
    <h2 id="bdTitle">${esc(c.title)}</h2>
    <p class="bd-sub">${esc(p.name)} · ${esc(BP.techniques[c.tech].name)}</p>
    <div class="bd-price">${BP.money(BP.unitPrice(p))} <small>c/u</small></div>
    ${p.colors.length > 1 ? `<div class="opt"><b>Color: ${esc(p.colors[c.ci].n)}</b><div class="sw">${p.colors.map((k, i) => `<button type="button" data-ci="${i}" style="background:${k.hex}" aria-label="${esc(k.n)}" aria-pressed="${i === c.ci}"></button>`).join('')}</div></div>` : ''}
    ${p.sizes.length > 1 ? `<div class="opt"><b>Talla</b><div class="sz">${p.sizes.map(s => `<button type="button" data-sz="${s}" aria-pressed="${s === c.size}">${s}</button>`).join('')}</div></div>` : ''}
    <div class="opt"><b>Cantidad</b><div class="qty"><button type="button" data-q="-1" aria-label="Menos">−</button><input type="number" min="1" value="${c.qty}" aria-label="Cantidad" data-qin><button type="button" data-q="1" aria-label="Más">+</button></div></div>
    <div class="sumrow t"><span>Total</span><span>${BP.money(total)}</span></div>
    <div class="bd-act"><button type="button" class="btn alt" data-add>Agregar al carrito</button><button type="button" class="btn" data-buy>Comprar ahora</button></div>
    <a class="link bd-more" href="producto-${p.id}.html">Ver ficha completa del producto →</a>
  </div></div>`;
  }
  dlg.addEventListener('click', e => {
    if (e.target === dlg || e.target.closest('[data-x]')) { dlg.close(); return; }
    const b = e.target.closest('button'); if (!b || !cur) return;
    if (b.dataset.ci) cur.ci = +b.dataset.ci;
    else if (b.dataset.sz) cur.size = b.dataset.sz;
    else if (b.dataset.q) cur.qty = Math.max(1, cur.qty + +b.dataset.q);
    else if (b.hasAttribute('data-add')) { add(cur.p, cur); BP.toast('Agregado al carrito ✔'); dlg.close(); return; }
    else if (b.hasAttribute('data-buy')) { add(cur.p, cur); location.href = 'carrito.html'; return; }
    else return;
    paint();
  });
  dlg.addEventListener('change', e => { if (e.target.matches('[data-qin]')) { cur.qty = Math.max(1, +e.target.value || 1); paint(); } });
})(window.BP);

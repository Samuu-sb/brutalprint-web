(function (BP) {
  const { $, $$, esc } = BP, root = $('#cartRoot'), M = BP.money;
  function render() {
    const c = BP.cart.get();
    if (!c.length) { root.innerHTML = `<div class="empty"><h3>Tu carrito está vacío</h3><p style="margin:.5rem 0 1.2rem">Elige una prenda para empezar.</p><a class="btn" href="tienda.html">Ir a la tienda</a></div>`; return; }
    const lines = c.map(it => {
      const p = BP.getProduct(it.id), u = BP.cart.unit(it);
      return `<div class="line"><div class="th">${BP.art(p.shape, (p.colors.find(x => x.n === it.color) || p.colors[0]).hex, { label: p.name })}</div>
<div><div class="nm"><a href="producto-${p.id}.html">${esc(p.name)}</a></div>
<div class="sub">${esc(it.color)}${it.size ? ' · ' + esc(it.size) : ''} · ${BP.techniques[it.tech].name}${it.note ? '<br>“' + esc(it.note) + '”' : ''}</div>
<div class="qty" style="margin-top:.5rem"><button type="button" data-k="${esc(it.key)}" data-d="-1" aria-label="Menos">−</button><input type="number" min="1" value="${it.qty}" data-k="${esc(it.key)}" aria-label="Cantidad"><button type="button" data-k="${esc(it.key)}" data-d="1" aria-label="Más">+</button></div>
<div><button class="rm" type="button" data-rm="${esc(it.key)}">Quitar</button></div></div>
<div class="lt">${M(u * it.qty)}<div class="sub">${M(u)} c/u</div></div></div>`;
    }).join('');
    const sub = BP.cart.subtotal(), dep = Math.round(sub * BP.config.depositPct) / 100;
    root.innerHTML = `<div class="cartgrid"><div class="card">${lines}</div>
<aside class="card quote-sum"><h3>Resumen</h3>
<div class="sumrow"><span>Subtotal</span><b>${M(sub)}</b></div>
<div class="sumrow"><span>Envío</span><span>Se calcula al finalizar</span></div>
<div class="sumrow t"><span>Total</span><span>${M(sub)}</span></div>
<div class="sumrow" style="color:var(--grey)"><span>Abono (${BP.config.depositPct}%)</span><span>${M(dep)}</span></div>
<div class="pbuy"><a class="btn" href="checkout.html">Finalizar pedido</a>
<a class="btn wa" target="_blank" rel="noopener" href="${BP.wa('Hola Brutal Print, quiero hacer este pedido:\n' + BP.cartText())}">Enviar pedido por WhatsApp</a>
<a class="btn alt" href="tienda.html">Seguir comprando</a></div>
<p class="note" style="margin-top:1rem">Envío gratis en compras de más de ${M(BP.config.freeShippingOver)}. Precios referenciales; confirmamos el total final al aprobar tu diseño.</p></aside></div>`;
  }
  root.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.rm) { BP.cart.remove(b.dataset.rm); render(); }
    else if (b.dataset.d) { const l = BP.cart.get().find(x => x.key === b.dataset.k); BP.cart.setQty(b.dataset.k, l.qty + +b.dataset.d); render(); }
  });
  root.addEventListener('change', e => { const i = e.target.closest('input[data-k]'); if (i) { BP.cart.setQty(i.dataset.k, +i.value || 1); render(); } });
  render();
})(window.BP);

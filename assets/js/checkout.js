(function (BP) {
  const { $, $$ } = BP, M = BP.money, cfg = BP.config, form = $('#coForm');
  if (!BP.cart.get().length) { location.replace('carrito.html'); return; }
  const val = n => (form.querySelector(`[name="${n}"]:checked`) || form.elements[n] || {}).value;
  function totals() {
    const sub = BP.cart.subtotal(), s = cfg.shipping[val('ship')] || cfg.shipping.pickup;
    const ship = sub > cfg.freeShippingOver ? 0 : s.price; // envío gratis a cualquier parte en compras de más de $40
    const total = sub + ship, depPct = +val('dep') || 100, due = Math.round(total * depPct) / 100;
    return { sub, ship, total, depPct, due };
  }
  function paint() {
    const t = totals();
    const sh = val('ship');
    $('#addrBox').hidden = sh === 'pickup';
    $('#adLbl').textContent = sh === 'metro' ? 'Estación del Metro donde quieres recibirlo' : 'Dirección de entrega';
    $('#ad').placeholder = sh === 'metro' ? 'Nombre de la estación (entregas los sábados)' : 'Provincia, distrito, corregimiento y referencia';
    $('#coSummary').innerHTML = `<h3>Tu pedido</h3>${BP.cart.get().map(it => `<div class="sumrow"><span>${it.qty} × ${BP.esc(BP.getProduct(it.id).name)}<br><small style="color:var(--grey)">${BP.esc(it.color)}${it.size ? ' · ' + BP.esc(it.size) : ''}</small></span><b>${M(BP.cart.unit(it) * it.qty)}</b></div>`).join('')}
<div class="sumrow"><span>Subtotal</span><b>${M(t.sub)}</b></div><div class="sumrow"><span>Envío</span><b>${t.ship ? M(t.ship) : 'Gratis'}</b></div>
<div class="sumrow t"><span>Total</span><span>${M(t.total)}</span></div>
<div class="sumrow" style="background:var(--amber-l);padding:.6rem;border-radius:8px"><span>A pagar ahora (${t.depPct}%)</span><b>${M(t.due)}</b></div>
<button class="btn" type="submit" style="width:100%;margin-top:1rem">Confirmar pedido</button>
<p style="font-size:.8rem;color:var(--grey);margin-top:.8rem">No se cobra nada en esta página. Al confirmar te damos las instrucciones de pago y coordinamos tu diseño por WhatsApp.</p>`;
  }
  form.addEventListener('change', paint);
  form.addEventListener('submit', e => {
    e.preventDefault();
    const nm = val('nm').trim(), ph = val('ph').replace(/\D/g, '');
    if (nm.length < 2) { $('#nm').focus(); BP.toast('Escribe tu nombre'); return; }
    if (ph.length < 7) { $('#ph').focus(); BP.toast('Escribe un WhatsApp válido'); return; }
    if (val('ship') !== 'pickup' && val('ad').trim().length < 5) { $('#ad').focus(); BP.toast('Agrega la dirección o estación de entrega'); return; }
    const t = totals();
    const code = 'BP-' + String(Date.now()).slice(-5);
    const order = { code, phone4: ph.slice(-4), items: BP.cart.get().map(it => ({ ...it, unit: BP.cart.unit(it) })), ...t, ship_k: val('ship'), pay: val('pay'), customer: { nm, ph, em: val('em'), co: val('co'), ad: val('ad'), dt: val('dt'), nt: val('nt') }, state: 0, created: Date.now() };
    const all = BP.LS.get('bp_orders', []); all.unshift(order); BP.LS.set('bp_orders', all.slice(0, 20));
    BP.track('purchase_intent', { value: t.total, currency: 'USD' });
    BP.cart.clear();
    location.href = 'gracias.html?c=' + code;
  });
  paint();
})(window.BP);

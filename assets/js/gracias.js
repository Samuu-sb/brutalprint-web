(function (BP) {
  const { $, esc } = BP, M = BP.money, cfg = BP.config, root = $('#thanksRoot');
  const o = BP.LS.get('bp_orders', []).find(x => x.code === BP.param('c'));
  if (!o) { root.innerHTML = '<div class="empty"><h3>No encontramos ese pedido</h3><a class="btn" href="tienda.html" style="margin-top:1rem">Ir a la tienda</a></div>'; return; }
  const pay = {
    yappy: `<p>Paga con <b>Yappy</b> a <b>${esc(cfg.payments.yappy)}</b> y envíanos la captura por WhatsApp.</p>`,
    transfer: `<p>Transfiere a <b>${esc(cfg.payments.bank.name)}</b> · ${esc(cfg.payments.bank.type)} <b>${esc(cfg.payments.bank.number)}</b> · ${esc(cfg.payments.bank.holder)}. Envía el comprobante por WhatsApp.</p>`,
    cash: '<p>Pagas en efectivo al retirar en el taller. Para iniciar producción confirmaremos tu pedido por WhatsApp.</p>'
  }[o.pay] || '';
  const msg = `Hola Brutal Print, acabo de hacer el pedido ${o.code}.\nNombre: ${o.customer.nm}\n${o.items.map(it => `• ${it.qty} x ${BP.getProduct(it.id).name} (${it.color}${it.size ? ', ' + it.size : ''}, ${BP.techniques[it.tech].name})`).join('\n')}\nTotal: ${M(o.total)} · Abono: ${M(o.due)}\nEnvío mi logo/diseño a continuación.`;
  root.innerHTML = `<div class="two"><div class="card"><span class="tag">Pedido ${esc(o.code)}</span><h2 style="margin:.8rem 0">¡Gracias, ${esc(o.customer.nm.split(' ')[0])}!</h2>
<p>Registramos tu pedido. <b>El siguiente paso es enviarnos tu diseño por WhatsApp</b> para preparar la prueba de arte.</p>
<div class="pbuy"><a class="btn wa" target="_blank" rel="noopener" href="${BP.wa(msg)}">Enviar mi diseño por WhatsApp</a><a class="btn alt" href="seguimiento.html?c=${esc(o.code)}">Seguir mi pedido</a></div></div>
<div class="card"><h3>Pago: ${M(o.due)} ${o.depPct < 100 ? `(abono del ${o.depPct}%)` : ''}</h3>${pay}
<p class="note" style="margin-top:1rem">Guarda tu número de pedido <b>${esc(o.code)}</b> y los últimos 4 dígitos de tu WhatsApp para consultar el estado.</p>
<div class="sumrow t"><span>Total del pedido</span><span>${M(o.total)}</span></div></div></div>`;
})(window.BP);

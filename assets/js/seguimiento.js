(function (BP) {
  const { $, esc } = BP, out = $('#trOut');
  // Demo: sin servidor, los pedidos viven en este navegador. En producción se conectará a una base de datos.
  const demo = { code: 'BP-DEMO', phone4: '0000', state: 3, created: Date.now() - 4 * 864e5, items: [{ id: 'camiseta-clasica', qty: 24, color: 'Negro', size: '', tech: 'serigrafia' }], due: 0, total: 0 };
  function show(o) {
    const items = o.items.map(it => `${it.qty} × ${BP.getProduct(it.id).name}`).join(', ');
    out.innerHTML = `<div class="card"><span class="tag">Pedido ${esc(o.code)}</span><h2 style="margin:.6rem 0">${BP.orderStates[o.state]}</h2>
<div class="track-steps">${BP.orderStates.map((s, i) => `<div class="${i < o.state ? 'done' : i === o.state ? 'done now' : ''}">${s}</div>`).join('')}</div>
<p><b>Pedido:</b> ${esc(items)}</p><p><b>Creado:</b> ${new Date(o.created).toLocaleDateString('es-PA')}</p>
<a class="btn wa sm" style="margin-top:1rem" target="_blank" rel="noopener" href="${BP.wa('Hola Brutal Print, consulto por mi pedido ' + o.code)}">Preguntar por WhatsApp</a>
<p style="font-size:.8rem;color:var(--grey);margin-top:1rem">${o.code === 'BP-DEMO' ? 'Esto es un ejemplo.' : 'El estado lo actualiza Brutal Print. En esta versión de prueba solo ves los pedidos hechos desde este mismo navegador.'}</p></div>`;
  }
  function find(code, p4) {
    if (code === 'BP-DEMO') return demo;
    return BP.LS.get('bp_orders', []).find(x => x.code === code && x.phone4 === p4);
  }
  $('#trForm').addEventListener('submit', e => {
    e.preventDefault();
    const o = find($('#trCode').value.trim().toUpperCase(), $('#trPh').value.trim());
    o ? show(o) : out.innerHTML = '<div class="note warn">No encontramos ese pedido. Revisa el número y los 4 dígitos, o escríbenos por WhatsApp.</div>';
  });
  $('#trDemo').onclick = () => show(demo);
  if (BP.param('c')) { $('#trCode').value = BP.param('c'); const o = BP.LS.get('bp_orders', []).find(x => x.code === BP.param('c')); if (o) { $('#trPh').value = o.phone4; show(o); } }
})(window.BP);

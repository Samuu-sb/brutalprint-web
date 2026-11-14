(function (BP) {
  const { $, $$ } = BP, M = BP.money, cfg = BP.config;
  const sel = $('#qProd'), qty = $('#qQty'); let tech = null;
  if (BP.param('p') && BP.getProduct(BP.param('p'))) sel.value = BP.param('p');
  function chips() {
    const p = BP.getProduct(sel.value);
    if (!p.techs.includes(tech)) tech = p.techs[0];
    $('#qTech').innerHTML = p.techs.map(t => `<button type="button" class="chip" data-t="${t}" aria-pressed="${t === tech}">${BP.techniques[t].name}</button>`).join('');
  }
  function calc() {
    const p = BP.getProduct(sel.value), q = Math.max(1, +qty.value || 1), t = BP.tierFor(q), nx = BP.tiers[BP.tiers.indexOf(t) + 1];
    const loc = +$('#qLoc').value, unit = BP.unitPrice(p, q) + loc * 2;
    const svc = ($('#qVec').checked ? 12 : 0) + ($('#qDes').checked ? 25 : 0);
    const total = unit * q + svc, dep = Math.round(total * cfg.depositPct) / 100;
    const warn = (tech === 'serigrafia' && q < 12) ? '<p class="note warn" style="margin:.8rem 0">Para serigrafía recomendamos desde 12 piezas. Con menos, el DTF suele convenir más.</p>' : '';
    const msg = `Hola Brutal Print, quiero cotizar:\n• Producto: ${p.name}\n• Cantidad: ${q}\n• Técnica: ${BP.techniques[tech].name}\n• Ubicaciones extra: ${loc}\n• Diseño: ${$('#qVec').checked ? 'vectorizar logo' : ''}${$('#qDes').checked ? ' diseño desde cero' : ''}${$('#qNone').checked ? 'ya tengo arte' : ''}\n• Para: ${$('#qDt').value || 'por definir'}\n• Nombre: ${$('#qNm').value}\n• Detalles: ${$('#qNt').value}\nPrecio estimado en el sitio: ${M(total)}`;
    $('#qSum').innerHTML = `<h3>Tu cotización</h3><div class="big">${M(total)}</div><small style="color:var(--grey)">estimado total · ${M(unit)} por pieza</small>
<div class="sumrow" style="margin-top:1rem"><span>Tramo</span><b>${t.label} pzs</b></div>
<div class="sumrow"><span>Entrega estimada</span><b>${cfg.leadTimes[BP.techniques[tech].lead]}</b></div>
<div class="sumrow"><span>Abono (${cfg.depositPct}%)</span><b>${M(dep)}</b></div>
${nx ? `<div class="nudge">Con ${nx.min} piezas pagas ${M(BP.unitPrice(p, nx.min) + loc * 2)} c/u.</div>` : '<div class="nudge">🔥 Ya tienes el mejor precio por volumen.</div>'}${warn}
<div class="pbuy"><a class="btn wa" target="_blank" rel="noopener" href="${BP.wa(msg)}" data-track="cotizador_whatsapp">Enviar cotización por WhatsApp</a>
<button class="btn alt" type="button" id="qCart">Agregar al carrito</button></div>
<p style="font-size:.8rem;color:var(--grey);margin-top:.8rem">Estimado referencial. Confirmamos precio final al ver tu diseño.</p>`;
    $('#qCart').onclick = () => { BP.cart.add({ id: p.id, color: p.colors[0].n, size: p.sizes.length > 1 ? p.sizes[1] : '', tech, qty: q, note: $('#qNt').value.trim() }); BP.toast('Agregado al carrito ✔'); };
  }
  $('#qForm').addEventListener('input', calc);
  $('#qForm').addEventListener('change', e => { if (e.target === sel) { chips(); } if (e.target.id === 'qVec' || e.target.id === 'qDes') $('#qNone').checked = false; calc(); });
  $('#qTech').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; tech = b.dataset.t; chips(); calc(); });
  chips(); calc();
})(window.BP);

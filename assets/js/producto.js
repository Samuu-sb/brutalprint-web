(function (BP) {
  const { $, $$ } = BP;
  const root = $('[data-pid]'); const p = BP.getProduct(root.dataset.pid);
  const st = { ci: 0, size: p.sizes.length > 1 ? p.sizes[1] : p.sizes[0], tech: p.techs[0], qty: 12 };
  const notes = { dtf: 'Full color, sin mínimo. Entrega ' + BP.config.leadTimes.dtf + '.', serigrafia: 'Mejor precio en volumen (desde 12). Entrega ' + BP.config.leadTimes.serigrafia + '.', sublimacion: 'Impresión total, color permanente. Entrega ' + BP.config.leadTimes.sublimacion + '.' };

  function paint() {
    const q = Math.max(1, st.qty | 0), unit = BP.unitPrice(p, q), tier = BP.tierFor(q);
    $('#pUnit').textContent = BP.money(unit);
    $('#pTier').textContent = 'tramo ' + tier.label;
    $('#pTotal').textContent = BP.money(unit * q);
    $('#pSave').hidden = tier.mult === 1; $('#pSave').textContent = 'Ahorras ' + Math.round((1 - tier.mult) * 100) + '%';
    $('#lead').textContent = BP.config.leadTimes[BP.techniques[st.tech].lead];
    $('#tierBody').innerHTML = BP.tiers.map(t => `<tr class="${t === tier ? 'hl-row' : ''}"><td>${t.label}</td><td class="pr">${BP.money(BP.unitPrice(p, t.min))}</td></tr>`).join('');
    $('#pArt').innerHTML = BP.art(p.shape, p.colors[st.ci].hex, { label: p.name });
    $('#cName').textContent = p.colors[st.ci].n;
    const tn = $('#techNote'); if (tn) tn.textContent = notes[st.tech];
    const c = p.colors[st.ci].n;
    $('#waQuote').href = BP.wa(`Hola Brutal Print, quiero cotizar: ${q} x ${p.name} (${c}${p.sizes.length > 1 ? ', talla ' + st.size : ''}, ${BP.techniques[st.tech].name}). ${$('#pNote').value}`);
  }
  $('#pColors').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; st.ci = +b.dataset.i; $$('#pColors button').forEach(x => x.setAttribute('aria-pressed', x === b)); paint(); });
  const sz = $('#pSizes'); if (sz) sz.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; st.size = b.dataset.s; $$('#pSizes button').forEach(x => x.setAttribute('aria-pressed', x === b)); paint(); });
  const te = $('#pTech'); if (te) te.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; st.tech = b.dataset.t; $$('#pTech button').forEach(x => x.setAttribute('aria-pressed', x === b)); paint(); });
  const qi = $('#qty');
  qi.addEventListener('input', () => { st.qty = Math.max(1, +qi.value || 1); paint(); });
  $('#qMinus').onclick = () => { st.qty = Math.max(1, st.qty - 1); qi.value = st.qty; paint(); };
  $('#qPlus').onclick = () => { st.qty += 1; qi.value = st.qty; paint(); };
  $('#pNote').addEventListener('input', paint);
  $('#addCart').onclick = () => {
    const q = Math.max(1, st.qty | 0);
    BP.cart.add({ id: p.id, color: p.colors[st.ci].n, size: p.sizes.length > 1 ? st.size : '', tech: st.tech, qty: q, note: $('#pNote').value.trim() });
    BP.track('add_to_cart', { content_name: p.name, value: BP.unitPrice(p, q) * q, currency: 'USD' });
    BP.toast('Agregado al carrito ✔');
  };
  document.title = document.title; paint();
})(window.BP);

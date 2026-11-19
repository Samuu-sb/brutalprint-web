(function (BP) {
  const { $, $$ } = BP;
  const root = $('[data-pid]'); const p = BP.getProduct(root.dataset.pid);
  const st = { ci: 0, age: 'adult', size: BP.defaultSize(p), tech: p.techs[0], qty: 12 };
  const lead = t => BP.config.leadTimes[BP.techniques[t].lead];
  const notes = { dtf: 'Full color, sin mínimo.', serigrafia: 'Colores sólidos y muy durable.', sublimacion: 'Color permanente, ideal para promocionales.', impresion3d: 'Pieza a medida según tu modelo.' };
  // Talla tal como se guarda en el carrito / WhatsApp (los niños llevan prefijo)
  const sizeLabel = () => (p.kids && st.age === 'kids' ? 'Niño ' + st.size : st.size);

  function paint() {
    const q = Math.max(1, st.qty | 0), unit = BP.unitPrice(p);
    $('#pUnit').textContent = BP.money(unit);
    $('#pTotal').textContent = BP.money(unit * q);
    $('#lead').textContent = lead(st.tech); // los días hábiles cambian según la técnica
    $('#pArt').innerHTML = BP.art(p.shape, p.colors[st.ci].hex, { label: p.name });
    $('#cName').textContent = p.colors[st.ci].n;
    const tn = $('#techNote'); if (tn) tn.textContent = notes[st.tech] + ' Entrega: ' + lead(st.tech).replace(/^D/, 'd') + '.';
    const c = p.colors[st.ci].n;
    $('#waQuote').href = BP.wa(`Hola Brutal Print, quiero pedir: ${q} x ${p.name} (${c}${p.sizes.length > 1 ? ', talla ' + sizeLabel() : ''}, ${BP.techniques[st.tech].name}). ${$('#pNote').value}`);
  }
  function paintSizes() {
    const list = p.kids && st.age === 'kids' ? BP.sizesKids : p.sizes;
    $('#pSizes').innerHTML = list.map(s => `<button type="button" data-s="${s}" aria-pressed="${s === st.size}">${s}</button>`).join('');
  }
  $('#pColors').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; st.ci = +b.dataset.i; $$('#pColors button').forEach(x => x.setAttribute('aria-pressed', x === b)); paint(); });
  const sz = $('#pSizes'); if (sz) sz.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; st.size = b.dataset.s; $$('#pSizes button').forEach(x => x.setAttribute('aria-pressed', x === b)); paint(); });
  const age = $('#pAge'); if (age) age.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    st.age = b.dataset.age; st.size = st.age === 'kids' ? '8' : BP.defaultSize(p);
    $$('#pAge button').forEach(x => x.setAttribute('aria-pressed', x === b));
    paintSizes(); paint();
  });
  const te = $('#pTech'); if (te) te.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; st.tech = b.dataset.t; $$('#pTech button').forEach(x => x.setAttribute('aria-pressed', x === b)); paint(); });
  const qi = $('#qty');
  qi.addEventListener('input', () => { st.qty = Math.max(1, +qi.value || 1); paint(); });
  $('#qMinus').onclick = () => { st.qty = Math.max(1, st.qty - 1); qi.value = st.qty; paint(); };
  $('#qPlus').onclick = () => { st.qty += 1; qi.value = st.qty; paint(); };
  $('#pNote').addEventListener('input', paint);
  $('#addCart').onclick = () => {
    const q = Math.max(1, st.qty | 0);
    BP.cart.add({ id: p.id, color: p.colors[st.ci].n, size: p.sizes.length > 1 ? sizeLabel() : '', tech: st.tech, qty: q, note: $('#pNote').value.trim() });
    BP.track('add_to_cart', { content_name: p.name, value: BP.unitPrice(p) * q, currency: 'USD' });
    BP.toast('Agregado al carrito ✔');
  };
  paint();
})(window.BP);

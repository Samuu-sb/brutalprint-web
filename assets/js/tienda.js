(function (BP) {
  const { $, $$, param } = BP;
  const state = { cats: new Set(), techs: new Set(), max: 30, sort: 'pop', q: (param('q') || '').toLowerCase() };
  if (param('t')) state.techs.add(param('t'));
  if (param('c')) state.cats.add(param('c'));
  const qInput = $('#q'); if (qInput && param('q')) qInput.value = param('q');

  function box(name, items, set) {
    return items.map(([id, label, n]) => `<label class="chk"><input type="checkbox" data-g="${name}" value="${id}" ${set.has(id) ? 'checked' : ''}> ${label}<em>${n}</em></label>`).join('');
  }
  function build() {
    $('#f-cat').innerHTML = box('cat', BP.categories.map(c => [c.id, c.name, BP.products.filter(p => p.cat === c.id).length]), state.cats);
    $('#f-tech').innerHTML = box('tech', Object.entries(BP.techniques).map(([k, t]) => [k, t.name, BP.products.filter(p => p.techs.includes(k)).length]), state.techs);
  }
  function card(p) {
    return `<a class="pcard" href="producto-${p.id}.html"><div class="img">${BP.art(p.shape, p.colors[0].hex, { label: p.name })}</div>
<div class="info"><span class="name">${p.name}</span><span class="meta">${p.techs.map(t => BP.techniques[t].name).join(' · ')}</span>
<div class="swatches">${p.colors.slice(0, 5).map(c => `<i style="background:${c.hex}" title="${c.n}"></i>`).join('')}</div>
<div class="price"><b>${BP.money(p.price)}</b><small>c/u</small></div></div></a>`;
  }
  function render() {
    let r = BP.products.filter(p =>
      (!state.cats.size || state.cats.has(p.cat)) &&
      (!state.techs.size || p.techs.some(t => state.techs.has(t))) &&
      p.price <= state.max &&
      (!state.q || (p.name + ' ' + p.cat + ' ' + p.desc + ' ' + p.techs.join(' ')).toLowerCase().includes(state.q)));
    if (state.sort === 'asc') r.sort((a, b) => a.price - b.price);
    if (state.sort === 'desc') r.sort((a, b) => b.price - a.price);
    $('#grid').innerHTML = r.map(card).join('');
    $('#empty').hidden = r.length > 0;
    $('#count').textContent = r.length + (r.length === 1 ? ' producto' : ' productos');
  }
  build(); render();
  $('#filters').addEventListener('change', e => {
    const t = e.target; if (t.dataset.g) { const s = t.dataset.g === 'cat' ? state.cats : state.techs; t.checked ? s.add(t.value) : s.delete(t.value); }
    render();
  });
  $('#f-price').addEventListener('input', e => { state.max = +e.target.value; $('#f-price-v').textContent = '$' + state.max; render(); });
  $('#sort').addEventListener('change', e => { state.sort = e.target.value; render(); });
  $('#f-clear').addEventListener('click', () => { state.cats.clear(); state.techs.clear(); state.max = 30; state.q = ''; $('#f-price').value = 30; $('#f-price-v').textContent = '$30'; build(); render(); });
  $('#fbtn').addEventListener('click', () => $('#filters').classList.toggle('on'));
})(window.BP);

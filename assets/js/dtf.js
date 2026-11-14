(function (BP) {
  const { $, esc } = BP, M = BP.money, ROLL = 56, GAP = 1, designs = [];
  const perM = len => len >= 5 ? 16 : 18; // PLACEHOLDER: precio por metro
  function pack() { // empaquetado por estantes
    const items = []; designs.forEach((d, di) => { for (let i = 0; i < d.q; i++) items.push({ w: d.w, h: d.h, di }); });
    items.sort((a, b) => b.h - a.h);
    let x = 0, y = 0, rowH = 0; const out = [];
    items.forEach(it => {
      if (x + it.w > ROLL) { x = 0; y += rowH + GAP; rowH = 0; }
      out.push({ ...it, x, y }); x += it.w + GAP; rowH = Math.max(rowH, it.h);
    });
    return { out, len: (y + rowH) / 100 };
  }
  function paint() {
    const { out, len } = pack(), m = Math.max(len, designs.length ? 0.5 : 0), price = perM(m), total = m * price;
    $('#dLen').textContent = m.toFixed(2) + ' m'; $('#dPm').textContent = M(price) + '/m'; $('#dTot').textContent = M(total);
    $('#dList').innerHTML = designs.length ? designs.map((d, i) => `<div class="sumrow"><span>${d.q} × ${esc(d.n)} <small style="color:var(--grey)">(${d.w}×${d.h} cm)</small></span><button class="rm" type="button" data-i="${i}" style="background:none;border:0;color:var(--red);font-weight:700;text-decoration:underline">Quitar</button></div>`).join('') : '<p style="color:var(--grey)">Aún no has agregado diseños.</p>';
    const sh = $('#dSheet'), W = sh.clientWidth || 300, sc = W / ROLL;
    sh.style.height = Math.max(240, len * 100 * sc) + 'px';
    sh.innerHTML = out.map(t => `<div class="tile" style="left:${t.x * sc}px;top:${t.y * sc}px;width:${t.w * sc}px;height:${t.h * sc}px">${esc(designs[t.di].n.slice(0, 12))}</div>`).join('');
    const msg = `Hola Brutal Print, quiero pedir una hoja DTF:\n${designs.map(d => `• ${d.q} x ${d.n} (${d.w}x${d.h} cm)`).join('\n')}\nLargo estimado: ${m.toFixed(2)} m · Total estimado: ${M(total)}`;
    $('#dWa').href = designs.length ? BP.wa(msg) : '#';
    $('#dWa').style.opacity = designs.length ? 1 : .5;
  }
  $('#dAdd').onclick = () => {
    const w = +$('#dW').value, h = +$('#dH').value, q = Math.max(1, +$('#dQ').value || 1), n = $('#dN').value.trim() || 'Diseño ' + (designs.length + 1);
    if (!(w > 0 && h > 0)) { BP.toast('Ingresa medidas válidas'); return; }
    if (w > ROLL) { BP.toast('El ancho máximo es ' + ROLL + ' cm'); return; }
    designs.push({ w, h, q, n }); $('#dN').value = ''; paint();
  };
  $('#dList').addEventListener('click', e => { const b = e.target.closest('[data-i]'); if (b) { designs.splice(+b.dataset.i, 1); paint(); } });
  $('#dWa').addEventListener('click', e => { if (!designs.length) { e.preventDefault(); BP.toast('Agrega al menos un diseño'); } });
  window.addEventListener('resize', paint); paint();
})(window.BP);

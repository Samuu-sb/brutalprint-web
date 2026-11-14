/* Ilustraciones vectoriales de producto (se usan en build y en el navegador) */
(function (BP) {
  const clamp = v => Math.max(0, Math.min(255, v));
  function shade(hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    const r = clamp((n >> 16) + amt), g = clamp(((n >> 8) & 255) + amt), b = clamp((n & 255) + amt);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  function lum(hex) {
    const n = parseInt(hex.slice(1), 16);
    return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  }
  BP.shade = shade; BP.lum = lum;

  let uid = 0;
  BP.art = function (shapeKey, hex, opts) {
    opts = opts || {};
    const s = BP.shapes[shapeKey] || BP.shapes.tee;
    const id = 'g' + (++uid);
    const isLight = lum(hex) > 0.6;
    const stroke = isLight ? '#0B0B0C' : shade(hex, 40);
    const edge = shade(hex, isLight ? -38 : 34);
    const emblem = (opts.base || '') + 'assets/img/' + (isLight ? 'emblem-black.webp' : 'emblem-white.webp');
    const p = s.print;
    let out = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" role="img" aria-label="' + (opts.label || 'Producto personalizable') + '">';
    out += '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".18"/></linearGradient>';
    if (shapeKey === 'jersey') out += '<clipPath id="c' + id + '">' + s.body.map(d => '<path d="' + d + '"/>').join('') + '</clipPath>';
    out += '</defs>';
    out += '<ellipse cx="100" cy="192" rx="62" ry="5" fill="#000" opacity=".12"/>';
    if (s.stroke) s.stroke.forEach(d => { out += '<path d="' + d + '" fill="none" stroke="' + edge + '" stroke-width="9" stroke-linecap="round"/>'; });
    (s.extra && shapeKey === 'hoodie' ? [s.extra[0]] : []).forEach(d => { out += '<path d="' + d + '" fill="' + shade(hex, isLight ? -22 : 18) + '"/>'; });
    s.body.forEach(d => { out += '<path d="' + d + '" fill="' + hex + '" stroke="' + edge + '" stroke-width="1.5" stroke-linejoin="round"/>'; });
    if (shapeKey === 'jersey') {
      const c = isLight ? '#0B0B0C' : '#FDA823';
      out += '<g clip-path="url(#c' + id + ')"><path d="M-10 150 L90 20 L120 20 L20 150Z" fill="' + c + '" opacity=".9"/><path d="M140 200 L215 100 L215 130 L165 200Z" fill="' + c + '" opacity=".9"/></g>';
    }
    if (s.extra && shapeKey !== 'hoodie') s.extra.forEach(d => { out += '<path d="' + d + '" fill="' + shade(hex, isLight ? -26 : 22) + '" stroke="' + edge + '" stroke-width="1.2"/>'; });
    if (shapeKey === 'hoodie') out += '<path d="' + s.extra[1] + '" fill="' + shade(hex, isLight ? -14 : 10) + '" stroke="' + edge + '" stroke-width="1.2"/>';
    if (shapeKey === 'tote') out += '<path d="M42 62 L158 62 L158 70 L42 70Z" fill="' + shade(hex, isLight ? -16 : 12) + '"/>';
    s.body.forEach(d => { out += '<path d="' + d + '" fill="url(#' + id + ')"/>'; });
    if (opts.print !== false) out += '<image href="' + emblem + '" x="' + p.x + '" y="' + p.y + '" width="' + p.w + '" height="' + p.h + '" preserveAspectRatio="xMidYMid meet"/>';
    return out + '</svg>';
  };
})(window.BP = window.BP || {});

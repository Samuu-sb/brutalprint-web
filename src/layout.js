/* Plantilla compartida: <head>, header, navegación, footer. Se ejecuta en Node al compilar. */
global.window = global;
require('../assets/js/config.js');
require('../assets/js/data.js');
require('../assets/js/art.js');
const BP = global.BP;
const cfg = BP.config;

const ico = {
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h2l2.4 11.2a2 2 0 002 1.6h7.7a2 2 0 002-1.5L21 8H6"/><circle cx="10" cy="20.5" r="1.3"/><circle cx="17" cy="20.5" r="1.3"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg>',
  wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.08-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.8h-.01a9.87 9.87 0 01-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 01-1.51-5.26c0-5.45 4.44-9.89 9.89-9.89 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 012.89 7c0 5.45-4.44 9.88-9.88 9.88M20.46 3.49A11.82 11.82 0 0012.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 005.68 1.45c6.56 0 11.89-5.34 11.9-11.89a11.82 11.82 0 00-3.48-8.41z"/></svg>'
};

const nav = [
  ['tienda.html', 'Tienda'], ['cotizar.html', 'Cotizar'], ['personalizar.html', 'Personalizar'],
  ['precios.html', 'Precios por volumen'], ['nichos.html', 'Para tu negocio'], ['dtf.html', 'DTF por metro'],
  ['portafolio.html', 'Portafolio'], ['seguimiento.html', 'Mi pedido'], ['mayoristas.html', 'Mayoristas', 'hot']
];

function head(p) {
  const url = cfg.siteUrl + '/' + (p.file === 'index.html' ? '' : p.file);
  return `<!doctype html>
<html lang="es-PA">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${p.title}</title>
<meta name="description" content="${p.desc}">
<meta name="theme-color" content="#0B0B0C">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website"><meta property="og:locale" content="es_PA">
<meta property="og:title" content="${p.title}"><meta property="og:description" content="${p.desc}">
<meta property="og:image" content="${cfg.siteUrl}/assets/img/logo-dark.webp"><meta property="og:url" content="${url}">
<link rel="icon" href="assets/img/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;600;700;800&family=Permanent+Marker&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">
${p.jsonld ? '<script type="application/ld+json">' + JSON.stringify(p.jsonld) + '</script>' : ''}
</head>`;
}

function header(current) {
  return `<body${current ? '' : ''}>
<a class="sr" href="#main">Saltar al contenido</a>
<div class="topbar"><div class="wrap">
  <span>⚡ DTF en 2–3 días · Prueba de diseño gratis</span>
  <span class="t-extra">Abono del ${cfg.depositPct}% · Yappy · Transferencia · Tarjeta</span>
  <span class="t-links"><a href="envios.html">Envíos</a><a href="faq.html">Preguntas</a><a href="contacto.html">Contacto</a></span>
</div></div>
<header class="header"><div class="wrap">
  <a class="logo" href="index.html" aria-label="Brutal Print Panamá — inicio"><img src="assets/img/logo-light.webp" width="124" height="44" alt="Brutal Print Panamá"></a>
  <form class="search" role="search" action="tienda.html" autocomplete="off">
    ${ico.search}<label class="sr" for="q">Buscar productos</label>
    <input id="q" name="q" type="search" placeholder="Buscar: camiseta, taza, jersey…">
    <div class="sugg" id="sugg"></div>
  </form>
  <a class="hbtn" href="mayoristas.html" aria-label="Mayoristas y cuenta">${ico.user}</a>
  <a class="hbtn" href="carrito.html" aria-label="Carrito">${ico.cart}<span class="badge" id="cartCount" data-n="0"></span></a>
</div>
<nav class="nav" aria-label="Principal"><div class="wrap">
${nav.map(n => `<a href="${n[0]}"${n[2] ? ` class="${n[2]}"` : ''}${current === n[0] ? ' aria-current="page"' : ''}>${n[1]}</a>`).join('\n')}
</div></nav></header>
<main id="main">`;
}

function footer() {
  return `</main>
<footer class="footer"><div class="wrap">
  <div class="cols">
    <div>
      <img class="fl" src="assets/img/logo-light.webp" alt="Brutal Print Panamá" width="160" height="57" loading="lazy">
      <p>Serigrafía, DTF y sublimación en Panamá. Del diseño al producto terminado, con prueba de arte antes de producir.</p>
      <div class="pay-pills" aria-label="Métodos de pago"><span>Yappy</span><span>Transferencia</span><span>Tarjeta</span><span>Efectivo</span></div>
    </div>
    <div><h4>Tienda</h4><ul>
      <li><a href="tienda.html">Todos los productos</a></li><li><a href="cotizar.html">Cotizar</a></li><li><a href="personalizar.html">Personalizador</a></li>
      <li><a href="precios.html">Precios por volumen</a></li><li><a href="dtf.html">DTF por metro</a></li><li><a href="mayoristas.html">Mayoristas</a></li></ul></div>
    <div><h4>Ayuda</h4><ul>
      <li><a href="seguimiento.html">Seguimiento de pedido</a></li><li><a href="envios.html">Envíos y entregas</a></li><li><a href="devoluciones.html">Cambios y garantía</a></li>
      <li><a href="faq.html">Preguntas frecuentes</a></li><li><a href="tecnicas.html">¿Qué técnica elegir?</a></li><li><a href="contacto.html">Contacto</a></li></ul></div>
    <div><h4>Escríbenos</h4><ul>
      <li><a href="${BP.wa()}" rel="noopener" target="_blank">WhatsApp ${cfg.whatsappDisplay}</a></li>
      <li><a href="https://instagram.com/${cfg.instagram}" rel="noopener" target="_blank">@${cfg.instagram}</a></li>
      <li><a href="mailto:${cfg.email}">${cfg.email}</a></li>
      <li>${cfg.hours}</li><li>${cfg.address}</li></ul></div>
  </div>
  <div class="bottom"><span>© ${new Date().getFullYear()} Brutal Print Panamá. Todos los derechos reservados.</span>
    <span><a href="terminos.html">Términos</a> · <a href="privacidad.html">Privacidad</a> · <a href="nosotros.html">Nosotros</a></span></div>
</div></footer>
<a class="fab" href="${BP.wa()}" target="_blank" rel="noopener" aria-label="Escribir por WhatsApp" data-track="whatsapp_fab">${ico.wa}</a>
<div class="cookie" id="cookie" role="dialog" aria-label="Cookies"><b>Cookies y analítica</b><p>Usamos cookies para medir visitas y mejorar la tienda. Puedes aceptar o rechazar las no esenciales.</p>
<div class="cta-row"><button class="btn sm" id="ck-yes">Aceptar</button><button class="btn sm alt" id="ck-no">Rechazar</button></div></div>
<div class="toast" id="toast" role="status" aria-live="polite"></div>`;
}

function page(p) {
  const scripts = ['config', 'data', 'art', 'app'].concat(p.scripts || []);
  return head(p) + '\n' + header(p.current || p.file) + '\n' + p.body + '\n' + footer() + '\n' +
    scripts.map(s => `<script src="assets/js/${s}.js"></script>`).join('\n') + '\n</body>\n</html>\n';
}

module.exports = { page, ico, BP };

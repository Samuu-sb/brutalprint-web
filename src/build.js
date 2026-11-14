/* Genera todas las páginas HTML en la raíz del sitio.  Uso: node src/build.js */
const fs = require('fs');
const path = require('path');
const { page, BP } = require('./layout');
const main = require('./pages-main').pages;
const info = require('./pages-info').pages;
const root = path.join(__dirname, '..');
const all = [...main, ...info];
for (const p of all) fs.writeFileSync(path.join(root, p.file), page(p));
const base = BP.config.siteUrl;
fs.writeFileSync(path.join(root, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  all.filter(p => !['checkout.html', 'gracias.html', 'carrito.html'].includes(p.file)).map(p => `<url><loc>${base}/${p.file === 'index.html' ? '' : p.file}</loc></url>`).join('\n') + '\n</urlset>\n');
fs.writeFileSync(path.join(root, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /checkout.html\nDisallow: /gracias.html\nSitemap: ${base}/sitemap.xml\n`);
console.log('Generadas ' + all.length + ' páginas');

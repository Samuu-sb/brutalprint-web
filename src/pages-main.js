/* Páginas comerciales: home, tienda, producto, carrito, checkout, personalizar, precios, nichos, dtf, portafolio, seguimiento, mayoristas */
const { BP, ico } = require('./layout');
const cfg = BP.config;
const $ = BP.money;
const phead = (title, sub, crumb) => `<div class="phead"><div class="wrap"><div class="crumbs"><a href="index.html">Inicio</a> / ${crumb || title}</div><h1>${title}</h1>${sub ? `<p>${sub}</p>` : ''}</div></div>`;

const pcard = BP.pcard;
const SHOW_REVIEWS = false; // pon true para volver a mostrar la sección de reseñas en el inicio

const pages = [];

/* ---------------- HOME ---------------- */
const featured = ['camiseta-clasica', 'jersey-equipo', 'hoodie-clasico', 'taza-ceramica', 'gorra-trucker', 'polo-uniforme', 'tote-bag', 'camiseta-oversize'].map(BP.getProduct);
pages.push({
  file: 'index.html', title: 'Brutal Print Panamá | Serigrafía, DTF, sublimación e impresión 3D en Panamá',
  desc: 'Camisetas, uniformes, jerseys, tazas y más personalizados en Panamá. Serigrafía, DTF, sublimación e impresión 3D: personaliza tu estilo y paga con Yappy o transferencia.',
  jsonld: { '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'Brutal Print Panamá', description: 'Serigrafía, DTF y sublimación en Panamá', url: cfg.siteUrl, telephone: '+' + cfg.whatsapp, address: { '@type': 'PostalAddress', addressCountry: 'PA', addressLocality: 'Colón' }, sameAs: ['https://instagram.com/' + cfg.instagram], priceRange: '$$' },
  body: `
<section class="hero"><div class="wrap">
  <div>
    <span class="eyebrow">Rock · Metal · Punk · Grunge · Geek</span>
    <h1>Tu banda.<br>Tu ruido.<br><span class="hl">Tu merch.</span></h1>
    <p class="lead">Camisetas, hoodies y accesorios de cultura underground, estampados en Panamá. Elige del catálogo o manda tu propio diseño y lo hacemos realidad.</p>
    <div class="cta-row">
      <a class="btn" href="tienda.html" data-track="cta_catalogo_hero">Explorar catálogo</a>
      <a class="btn alt" href="personalizar.html" data-track="cta_personalizar_hero">Pedir personalizado</a>
    </div>
    <div class="hero-trust"><span><i></i>Desde 1 pieza en DTF</span><span><i></i>Prueba de arte antes de producir</span><span><i></i>Abono del ${cfg.depositPct}%</span></div>
  </div>
  <div class="hero-photos" aria-hidden="true">
    <figure class="p1"><img src="assets/img/portafolio/a1.webp" alt="" width="800" height="1000"></figure>
    <figure class="p2"><img src="assets/img/portafolio/igg3.webp" alt="" width="800" height="1000"></figure>
    <figure class="p3"><img src="assets/img/portafolio/a12.webp" alt="" width="800" height="1000"></figure>
    <div class="stamp">Hecho en Panamá</div>
  </div>
</div></section>
<div class="strip" aria-hidden="true"><div class="track">${Array(12).fill('<span>Rock</span><span>Metal</span><span>Punk</span><span>Grunge</span><span>Geek</span><span>Serigrafía</span><span>DTF</span>').join('')}</div></div>

<section><div class="wrap">
  <div class="sec-head"><div><span class="eyebrow">Elige tu método</span><h2>Cuatro técnicas, <span class="hl">un taller</span></h2></div><a class="link" href="tecnicas.html">¿Cuál me conviene? →</a></div>
  <div class="grid g2">
  ${Object.entries(BP.techniques).map(([k, t], i) => `<a class="card tech" href="tienda.html?t=${k}"><span class="num">0${i + 1}</span><h3>${t.name}</h3><span class="tag">${t.tag}</span><p>${t.desc}</p><ul>${t.best.map(b => `<li>${b}</li>`).join('')}</ul><small><b>Entrega:</b> ${cfg.leadTimes[t.lead]}</small></a>`).join('')}
  </div>
</div></section>

<section style="padding-top:0"><div class="wrap">
  <div class="sec-head"><div><span class="eyebrow">Catálogo</span><h2>Lo más <span class="hl">pedido</span></h2></div><a class="btn sm alt" href="tienda.html">Ver toda la tienda</a></div>
  <div class="grid g4 prod">${featured.map(pcard).join('')}</div>
</div></section>

<section class="dark"><div class="wrap">
  <div class="sec-head"><div><span class="eyebrow">Para tu proyecto</span><h2>Hecho para <span class="hl">tu caso</span></h2></div><a class="link" href="nichos.html">Ver todos →</a></div>
  <div class="grid g3">${Object.entries(BP.nichos).map(([k, n]) => `<a class="nicho" href="nicho-${k}.html"><span class="ic">${n.icon}</span><div><h3>${n.name}</h3><p>${n.sub}</p></div></a>`).join('')}</div>
</div></section>

<section><div class="wrap">
  <div class="sec-head"><div><span class="eyebrow">Sin sorpresas</span><h2>Así funciona</h2></div></div>
  <div class="grid g4 steps">
    <div class="card step"><h3>Cuéntanos</h3><p>Escríbenos por WhatsApp con tu idea, cantidades y fecha.</p></div>
    <div class="card step"><h3>Aprueba el arte</h3><p>Personaliza tu estilo: te enviamos una prueba de tu diseño. Nada se produce sin tu visto bueno.</p></div>
    <div class="card step"><h3>Abona ${cfg.depositPct}%</h3><p>Yappy o transferencia. El resto lo pagas al retirar o antes del envío.</p></div>
    <div class="card step"><h3>Recibe</h3><p>Sigue tu pedido en línea y retira en el taller o recíbelo en todo Panamá.</p></div>
  </div>
</div></section>

<section class="dark"><div class="wrap" style="max-width:760px">
  <div class="grid" style="align-items:center">
    <div class="card dk" style="border-color:var(--white)">
      <span class="tag">Mayoristas</span>
      <h2 style="margin:.8rem 0">Precios especiales y recompra rápida</h2>
      <p style="color:#C9C5B8;margin-bottom:1.2rem">Si produces o revendes con frecuencia, abre tu cuenta de mayorista: tarifas preferenciales, artes guardados y pedidos repetidos en un clic.</p>
      <a class="btn alt" href="mayoristas.html">Quiero ser mayorista</a>
    </div>
  </div>
</div></section>

${SHOW_REVIEWS ? `<section><div class="wrap">
  <div class="sec-head"><div><span class="eyebrow">Trabajos y clientes</span><h2>Lo que hemos <span class="hl">estampado</span></h2></div><a class="link" href="portafolio.html">Ver portafolio →</a></div>
  <div class="grid g3">${BP.reviews.map(r => `<div class="card rev">${r.placeholder ? '<span class="ph-note">Ejemplo · reemplazar</span>' : ''}<span class="stars" aria-label="${r.stars} estrellas">${'★'.repeat(r.stars)}</span><p>“${r.text}”</p><b>${r.name}</b><small>${r.role}</small></div>`).join('')}</div>
</div></section>` : ''}

<section style="padding-top:0"><div class="wrap" style="max-width:860px">
  <div class="sec-head"><h2>Preguntas frecuentes</h2></div>
  ${BP.faq.slice(0, 5).map(f => `<details class="faq"><summary>${f.q}</summary><div class="a">${f.a}</div></details>`).join('')}
  <a class="link" href="faq.html">Ver todas las preguntas →</a>
</div></section>

<div class="cta-band"><section><div class="wrap">
  <h2>¿Tienes una idea? Hagámosla real.</h2>
  <p class="lead" style="margin:0 auto 1.6rem;color:#2d2d33">Cuéntanos qué necesitas y te respondemos con el precio y la prueba de tu diseño.</p>
  <div class="cta-row"><a class="btn wa" href="${BP.wa('Hola Brutal Print, quiero hacer un pedido.')}" target="_blank" rel="noopener">${ico.wa} Escribir por WhatsApp</a></div>
</div></section></div>`
});

/* ---------------- TIENDA ---------------- */
pages.push({
  file: 'tienda.html', title: 'Tienda | Brutal Print Panamá', desc: 'Camisetas, hoodies, jerseys, gorras, tazas y más listos para personalizar con serigrafía, DTF o sublimación en Panamá.', scripts: ['tienda'],
  body: `${phead('Tienda', 'Elige tu prenda base y personalízala con tu diseño.')}
<div class="page"><div class="wrap shop">
  <aside class="filters" id="filters" aria-label="Filtros">
    <div class="fgroup"><h3>Categoría</h3><div id="f-cat"></div></div>
    <div class="fgroup"><h3>Técnica</h3><div id="f-tech"></div></div>
    <div class="fgroup"><h3>Precio máximo</h3><input type="range" id="f-price" min="5" max="30" step="1" value="30"><div class="sumrow"><span>Hasta</span><b id="f-price-v">$30</b></div></div>
    <button class="btn sm alt" id="f-clear" type="button">Limpiar filtros</button>
  </aside>
  <div>
    <div class="toolbar"><button class="btn sm alt fbtn" id="fbtn" type="button">Filtros</button><span id="count" aria-live="polite"></span>
      <label class="sr" for="sort">Ordenar</label><select id="sort"><option value="pop">Más populares</option><option value="asc">Precio: menor a mayor</option><option value="desc">Precio: mayor a menor</option></select></div>
    <div class="grid g3 prod" id="grid"></div>
    <div class="empty" id="empty" hidden><h3>Sin resultados</h3><p>Prueba con otros filtros o cuéntanos qué buscas (por ejemplo, Impresión 3D).</p><a class="btn wa" href="${BP.wa('Hola Brutal Print, busco algo que no veo en la tienda.')}" target="_blank" rel="noopener" style="margin-top:1rem">Escríbenos por WhatsApp</a></div>
  </div>
</div></div>`
});

/* ---------------- PRODUCTO (uno por producto) ---------------- */
BP.products.forEach(p => {
  const techNames = p.techs.map(t => BP.techniques[t].name).join(', ');
  pages.push({
    file: `producto-${p.id}.html`, current: 'tienda.html', title: `${p.name} personalizada | Brutal Print Panamá`,
    desc: `${p.desc} Desde ${$(p.price)}. Personalizado con ${techNames} en Panamá.`, scripts: ['producto'],
    jsonld: { '@context': 'https://schema.org', '@type': 'Product', name: p.name, description: p.desc, brand: { '@type': 'Brand', name: 'Brutal Print Panamá' }, offers: { '@type': 'Offer', priceCurrency: 'USD', price: p.price, availability: 'https://schema.org/InStock' } },
    body: `<div class="phead" style="padding:1.2rem 0"><div class="wrap"><div class="crumbs" style="margin:0"><a href="index.html">Inicio</a> / <a href="tienda.html">Tienda</a> / ${p.name}</div></div></div>
<div class="page" data-pid="${p.id}"><div class="wrap">
<div class="pdp">
  <div class="gallery"><div class="main" id="pArt">${BP.art(p.shape, p.colors[0].hex, { label: p.name })}</div></div>
  <div>
    <div>${p.badge ? `<span class="tag">${p.badge}</span> ` : ''}${p.techs.map(t => `<span class="tag">${BP.techniques[t].name}</span> `).join('')}</div>
    <h1 style="margin-top:.6rem">${p.name}</h1>
    <div class="price"><span id="pUnit">${$(p.price)}</span> <small>c/u</small></div>
    <p>${p.desc}</p>
    <div class="opt"><b>Color: <span id="cName">${p.colors[0].n}</span></b><div class="sw" id="pColors">${p.colors.map((c, i) => `<button type="button" style="background:${c.hex}" data-i="${i}" aria-label="${c.n}" aria-pressed="${i === 0}"></button>`).join('')}</div></div>
    ${p.sizes.length > 1 ? `<div class="opt"><b>Talla</b>${p.kids ? '<div class="chips" id="pAge" style="margin:.4rem 0 .7rem"><button type="button" class="chip" data-age="adult" aria-pressed="true">Adulto</button><button type="button" class="chip" data-age="kids" aria-pressed="false">Niño</button></div>' : ''}<div class="sz" id="pSizes">${p.sizes.map(s => `<button type="button" data-s="${s}" aria-pressed="${s === BP.defaultSize(p)}">${s}</button>`).join('')}</div></div>` : ''}
    ${p.techs.length > 1 ? `<div class="opt"><b>Técnica</b><div class="chips" id="pTech">${p.techs.map((t, i) => `<button type="button" class="chip" data-t="${t}" aria-pressed="${i === 0}">${BP.techniques[t].name}</button>`).join('')}</div><small id="techNote" style="display:block;margin-top:.5rem;color:var(--grey)"></small></div>` : ''}
    <div class="opt"><b>Cantidad</b><div class="qty"><button type="button" id="qMinus" aria-label="Menos">−</button><input type="number" id="qty" value="12" min="1" max="9999" aria-label="Cantidad"><button type="button" id="qPlus" aria-label="Más">+</button></div></div>
    <div class="opt"><label class="f" for="pNote">Notas para tu pedido (opcional)</label><textarea id="pNote" placeholder="Ej: logo en pecho izquierdo y nombre en espalda"></textarea></div>
    <div class="pbuy">
      <div class="sumrow t"><span>Total estimado</span><span id="pTotal"></span></div>
      <button class="btn" id="addCart" type="button">Agregar al carrito</button>
      <a class="btn wa" id="waQuote" href="#" target="_blank" rel="noopener">${ico.wa} Pedir este producto por WhatsApp</a>
      <a class="btn alt" href="personalizar.html?p=${p.id}">Ver mi diseño en esta prenda</a>
    </div>
    <div class="usp"><div>🎨 Personaliza tu estilo</div><div>⏱ <span id="lead"></span></div><div>💰 Abono del ${cfg.depositPct}%</div></div>
    <ul style="margin:1.4rem 0 0;padding-left:1.2rem;display:grid;gap:.4rem">${p.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
    <p class="note" style="margin-top:1.2rem">El precio incluye 1 diseño en 1 ubicación. Después de agregar, subirás o enviarás tu arte por WhatsApp para aprobar la prueba antes de producir.</p>
  </div>
</div>
<div style="margin-top:4rem"><h2 style="margin-bottom:1.5rem">También te puede interesar</h2><div class="grid g4 prod">${BP.products.filter(x => x.id !== p.id && (x.cat === p.cat || x.techs.some(t => p.techs.includes(t)))).slice(0, 4).map(pcard).join('')}</div></div>
</div></div>`
  });
});

/* ---------------- CARRITO ---------------- */
pages.push({
  file: 'carrito.html', title: 'Carrito | Brutal Print Panamá', desc: 'Revisa tu pedido personalizado.', scripts: ['carrito'],
  body: `${phead('Tu carrito')}<div class="page"><div class="wrap"><div id="cartRoot"></div></div></div>`
});

/* ---------------- CHECKOUT ---------------- */
pages.push({
  file: 'checkout.html', current: 'carrito.html', title: 'Finalizar pedido | Brutal Print Panamá', desc: 'Confirma tu pedido personalizado y elige cómo pagar.', scripts: ['checkout'],
  body: `${phead('Finalizar pedido', 'Confirmas tu pedido, abonas y aprobamos el diseño contigo por WhatsApp.')}
<div class="page"><div class="wrap"><form id="coForm" class="cartgrid" novalidate>
 <div>
  <div class="card" style="margin-bottom:1.5rem"><h3 style="margin-bottom:1rem">1. Tus datos</h3>
   <div class="row2"><div class="field"><label class="f" for="nm">Nombre</label><input id="nm" name="nm" type="text" required autocomplete="name"></div>
   <div class="field"><label class="f" for="ph">WhatsApp</label><input id="ph" name="ph" type="tel" required autocomplete="tel" placeholder="6000-0000"></div></div>
   <div class="row2"><div class="field"><label class="f" for="em">Correo (opcional)</label><input id="em" name="em" type="email" autocomplete="email"></div>
   <div class="field"><label class="f" for="co">Empresa / grupo (opcional)</label><input id="co" name="co" type="text"></div></div></div>
  <div class="card" style="margin-bottom:1.5rem"><h3 style="margin-bottom:1rem">2. Entrega</h3>
   ${Object.entries(cfg.shipping).map(([k, s], i) => `<label class="radio"><input type="radio" name="ship" value="${k}" ${i === 0 ? 'checked' : ''}><div><b>${s.label}</b><span>${s.price ? $(s.price) : 'Gratis'}</span></div></label>`).join('')}
   <p class="note" style="margin:.2rem 0 1rem">Envío gratis a cualquier parte del país en compras de más de ${$(cfg.freeShippingOver)}.</p>
   <div class="field" id="addrBox" hidden><label class="f" for="ad" id="adLbl">Dirección de entrega</label><textarea id="ad" name="ad" placeholder="Provincia, distrito, corregimiento y referencia"></textarea></div>
   <div class="field"><label class="f" for="dt">Fecha en que lo necesitas (opcional)</label><input id="dt" name="dt" type="text" placeholder="Ej: antes del 20 de diciembre"></div></div>
  <div class="card"><h3 style="margin-bottom:1rem">3. Pago</h3>
   <label class="radio"><input type="radio" name="dep" value="50" checked><div><b>Abonar ${cfg.depositPct}% ahora</b><span>Recomendado para pedidos personalizados. El resto al retirar o antes del envío.</span></div></label>
   <label class="radio"><input type="radio" name="dep" value="100"><div><b>Pagar el 100%</b><span>Todo de una vez.</span></div></label>
   <hr style="border:0;border-top:1px solid var(--line);margin:1rem 0">
   <label class="radio"><input type="radio" name="pay" value="yappy" checked><div><b>Yappy</b><span>Te damos el número al confirmar.</span></div></label>
   <label class="radio"><input type="radio" name="pay" value="transfer"><div><b>Transferencia / ACH</b><span>Enviamos los datos bancarios al confirmar.</span></div></label>
   <label class="radio"><input type="radio" name="pay" value="cash"><div><b>Efectivo en el taller</b><span>Solo para retiro.</span></div></label>
   <div class="field" style="margin-top:1rem"><label class="f" for="nt">Notas del pedido</label><textarea id="nt" name="nt" placeholder="Ubicación del logo, colores, nombres y números…"></textarea></div>
  </div>
 </div>
 <aside class="card quote-sum" id="coSummary"></aside>
</form></div></div>`
});

pages.push({
  file: 'gracias.html', current: 'carrito.html', title: 'Pedido recibido | Brutal Print Panamá', desc: 'Tu pedido fue registrado.', scripts: ['gracias'],
  body: `${phead('¡Pedido recibido!')}<div class="page"><div class="wrap" id="thanksRoot"></div></div>`
});

/* ---------------- PERSONALIZADOR ---------------- */
pages.push({
  file: 'personalizar.html', title: 'Personalizador con vista previa | Brutal Print Panamá', desc: 'Sube tu diseño y míralo sobre una camiseta, gorra, taza o hoodie antes de pedir. Descarga la vista previa y personaliza tu estilo.', scripts: ['personalizar'], modules: ['visor3d'], preload: ['assets/vendor/three/three.module.js', 'assets/vendor/three/loaders/GLTFLoader.js', 'assets/vendor/three/controls/OrbitControls.js', 'assets/vendor/three/geometries/DecalGeometry.js', 'assets/vendor/three/utils/BufferGeometryUtils.js'],
  body: `${phead('Personalizador', 'Sube tu diseño, muévelo y ve cómo queda. Es una vista previa orientativa: la prueba final la hacemos nosotros.')}
<div class="page"><div class="wrap two">
 <div class="stage"><canvas id="cv" width="800" height="800" aria-label="Vista previa del producto con tu diseño"></canvas><div id="stage3d" hidden aria-label="Vista previa 3D del producto"></div></div>
 <div>
  <div class="card" style="margin-bottom:1.2rem"><h3 style="margin-bottom:.8rem">1. Producto</h3><div class="chips" id="pzProd"></div>
   <h3 style="margin:1.2rem 0 .6rem">Color</h3><div class="sw" id="pzColors"></div></div>
  <div class="card" style="margin-bottom:1.2rem"><h3 style="margin-bottom:.8rem">2. Tu diseño</h3>
   <label class="drop"><input type="file" id="pzFile" accept="image/png,image/jpeg,image/webp,image/svg+xml"><b>Toca para subir tu diseño</b><br><small>PNG con fondo transparente funciona mejor. No se sube a ningún servidor: queda en tu dispositivo.</small></label>
   <div id="pzCtl" hidden style="margin-top:1rem">
     <label class="f" for="pzScale">Tamaño</label><input type="range" id="pzScale" min="10" max="200" value="80">
     <label class="f" for="pzRot">Rotación</label><input type="range" id="pzRot" min="-45" max="45" value="0">
     <div class="cta-row"><button class="btn sm alt" type="button" id="pzCenter">Centrar</button><button class="btn sm alt" type="button" id="pzRemove">Quitar diseño</button></div>
     <p style="font-size:.85rem;color:var(--grey);margin-top:.6rem"><span id="pzHint">Arrastra el diseño sobre la prenda para moverlo.</span></p></div></div>
  <div class="card"><h3 style="margin-bottom:.8rem">3. ¿Te gusta?</h3>
   <div class="field"><label class="f" for="pzQty">Cantidad</label><input type="number" id="pzQty" value="12" min="1"></div>
   <div class="pbuy"><button class="btn" id="pzDl" type="button">Descargar vista previa</button>
   <button class="btn wa" id="pzWa" type="button">${ico.wa} Pedir con esta vista previa</button>
   <a class="btn alt" id="pzProdLink" href="tienda.html">Ver producto y precios</a></div>
   <p class="note" style="margin-top:1rem">En el celular, al tocar el botón se abre el menú de compartir: elige WhatsApp y el contacto de Brutal Print (${cfg.whatsappDisplay}) y la vista previa va adjunta. Después envía también tu archivo de diseño original. En computadora se descarga la imagen y debes adjuntarla en WhatsApp.</p></div>
 </div>
</div></div>`
});


/* ---------------- NICHOS ---------------- */
pages.push({
  file: 'nichos.html', title: 'Soluciones para tu proyecto | Brutal Print Panamá', desc: 'Uniformes de empresa, equipos deportivos, graduaciones, eventos, iglesias y emprendedores: elige tu caso y escríbenos.',
  body: `${phead('Para tu proyecto', 'Elige tu caso y te mostramos lo que mejor funciona.')}<div class="page"><div class="wrap"><div class="grid g3">${Object.entries(BP.nichos).map(([k, n]) => `<a class="card tech" href="nicho-${k}.html"><span style="font-size:2.4rem">${n.icon}</span><h3>${n.name}</h3><p>${n.sub}</p><span class="link">Ver más →</span></a>`).join('')}</div></div></div>`
});
Object.entries(BP.nichos).forEach(([k, n]) => {
  pages.push({
    file: `nicho-${k}.html`, current: 'nichos.html', title: `${n.name} en Panamá | Brutal Print Panamá`, desc: `${n.headline}. ${n.sub}`,
    body: `${phead(n.name, n.sub, `<a href="nichos.html">Para tu proyecto</a> / ${n.name}`)}
<div class="page"><div class="wrap">
 <div class="two" style="margin-bottom:3rem">
  <div><span class="eyebrow">${n.icon} ${n.name}</span><h2>${n.headline}</h2><p class="lead" style="margin:1rem 0">${n.example}</p>
   <p style="margin-bottom:1rem"><b>Técnica recomendada:</b> ${n.techs.map(t => BP.techniques[t].name).join(' / ')}</p>
   <div class="cta-row"><a class="btn wa" href="${BP.wa('Hola Brutal Print, necesito información para ' + n.msg + '.')}" target="_blank" rel="noopener" data-track="cta_nicho_${k}">${ico.wa} Escribir por WhatsApp</a></div></div>
  <ul class="card" style="list-style:none;display:grid;gap:.8rem">${n.points.map(x => `<li>✔ ${x}</li>`).join('')}</ul>
 </div>
 <h2 style="margin-bottom:1.4rem">Productos recomendados</h2>
 <div class="grid g3 prod">${n.products.map(BP.getProduct).map(pcard).join('')}</div>
</div></div>`
  });
});


/* ---------------- PORTAFOLIO ---------------- */
const demo = [
  ['aa2', 'Camiseta "Hazardous Mutation"', 'DTF', 'camiseta-clasica'],
  ['aa3', 'Camiseta "Art of Partying"', 'DTF', 'camiseta-clasica'],
  ['aa4', 'Camiseta arte en blanco y negro', 'Serigrafía', 'camiseta-clasica'],
  ['aa5', 'Camiseta "The New Order"', 'DTF', 'camiseta-clasica'],
  ['aa6', 'Camiseta "Practice What You Preach"', 'DTF', 'camiseta-clasica'],
  ['aa7', 'Camiseta "Para Bellum"', 'Serigrafía', 'camiseta-clasica'],
  ['a1', 'Camiseta banda clásica, foto grupal', 'DTF', 'camiseta-clasica'],
  ['a12', 'Camiseta mascota de terror', 'DTF', 'camiseta-clasica'],
  ['a123', 'Camiseta "Cyber Army 2020"', 'DTF', 'camiseta-clasica'],
  ['igg2', 'Camiseta calavera vintage', 'Serigrafía', 'camiseta-clasica'],
  ['igg3', 'Camiseta "The End"', 'DTF', 'camiseta-clasica'],
  ['igg4', 'Camiseta "Piranha"', 'DTF', 'camiseta-clasica'],
  ['tazapokemon', 'Pokébola impresa en 3D', 'Impresión 3D', 'pokebola-3d']
];
pages.push({
  file: 'portafolio.html', title: 'Portafolio y reseñas | Brutal Print Panamá', desc: 'Trabajos realizados por Brutal Print Panamá: uniformes, jerseys, graduaciones, merch y regalos personalizados.', scripts: ['portafolio'],
  body: `${phead('Portafolio', 'Una muestra de lo que hemos producido.')}
<div class="page"><div class="wrap">
 <div class="port">${demo.map(d => { const pr = BP.getProduct(d[3]), sub = d[3] === 'camiseta-clasica' ? d[2] + ' · Algodón 100%' : d[2]; return `<figure class="ph" data-pid="${d[3]}" data-img="${d[0]}" data-title="${d[1].replace(/"/g, '&quot;')}" data-tech="${d[2]}">
  <button type="button" class="pimg" data-open aria-label="Comprar: ${d[1].replace(/"/g, '&quot;')}"><img src="assets/img/portafolio/${d[0]}.webp" alt="${d[1].replace(/"/g, '&quot;')} — ${sub}" loading="lazy" width="800" height="1000"><span class="quick">Comprar</span></button>
  <figcaption><span>${d[1]}</span><span>${sub}</span>
    <div class="buy"><div class="price"><b>${$(pr.price)}</b><small>c/u</small></div>
      <div class="acts"><button type="button" class="btn sm alt" data-add>Agregar</button><button type="button" class="btn sm" data-buy>Comprar</button></div></div>
  </figcaption></figure>`; }).join('')}</div>
 <div class="cta-row" style="margin-top:2.5rem"><a class="btn" href="https://instagram.com/${cfg.instagram}" target="_blank" rel="noopener">Ver más en Instagram</a></div>
</div></div>`
});

/* ---------------- SEGUIMIENTO ---------------- */
pages.push({
  file: 'seguimiento.html', title: 'Seguimiento de pedido | Brutal Print Panamá', desc: 'Consulta el estado de tu pedido con tu número de orden.', scripts: ['seguimiento'],
  body: `${phead('Seguimiento de pedido', 'Ingresa tu número de orden para ver en qué etapa va tu pedido.')}
<div class="page"><div class="wrap" style="max-width:820px">
 <form class="card" id="trForm"><div class="row2"><div class="field"><label class="f" for="trCode">Número de pedido</label><input id="trCode" type="text" placeholder="BP-1234" required></div>
 <div class="field"><label class="f" for="trPh">Últimos 4 dígitos de tu WhatsApp</label><input id="trPh" type="text" inputmode="numeric" maxlength="4" placeholder="0000" required></div></div>
 <button class="btn" type="submit">Consultar</button> <button class="btn alt" type="button" id="trDemo">Ver ejemplo</button></form>
 <div id="trOut" style="margin-top:2rem" aria-live="polite"></div>
</div></div>`
});

/* ---------------- MAYORISTAS ---------------- */
pages.push({
  file: 'mayoristas.html', title: 'Cuenta de mayorista | Brutal Print Panamá', desc: 'Precios especiales, artes guardados y recompra en un clic para talleres, marcas de ropa y revendedores en Panamá.', scripts: ['mayoristas'],
  body: `${phead('Cuenta de mayorista', 'Para talleres, marcas de ropa, agencias y empresas que piden con frecuencia.')}
<div class="page"><div class="wrap two">
 <div>
  <div class="grid" style="gap:1rem">
   ${[['💸', 'Tarifas preferenciales', 'Precios por volumen mejorados desde tu primer pedido como mayorista.'], ['🗂️', 'Artes guardados', 'Tus diseños aprobados quedan registrados. Cero volver a enviar archivos.'], ['🔁', 'Recompra rápida', 'Repite un pedido anterior con un mensaje y ajusta cantidades.'], ['🧾', 'Facturación y crédito', 'Coordinamos factura y condiciones de pago según el historial.']].map(x => `<div class="card" style="display:flex;gap:1rem"><span style="font-size:2rem">${x[0]}</span><div><h3>${x[1]}</h3><p>${x[2]}</p></div></div>`).join('')}
  </div>
 </div>
 <form class="card" id="mForm"><h3 style="margin-bottom:1rem">Solicitar cuenta</h3>
  <div class="field"><label class="f" for="mNm">Nombre y empresa</label><input id="mNm" type="text" required></div>
  <div class="field"><label class="f" for="mTy">Tipo de negocio</label><select id="mTy" style="width:100%"><option>Taller de estampado</option><option>Marca de ropa</option><option>Agencia / publicidad</option><option>Empresa con uniformes</option><option>Revendedor</option><option>Otro</option></select></div>
  <div class="field"><label class="f" for="mVol">Volumen mensual aproximado</label><input id="mVol" type="text" placeholder="Ej: 200 camisetas / 20 m de DTF"></div>
  <button class="btn wa" type="submit">${ico.wa} Enviar solicitud por WhatsApp</button>
  <p style="font-size:.82rem;color:var(--grey);margin-top:.8rem">La solicitud se envía por WhatsApp; no se crea ninguna cuenta ni se guardan datos en este sitio. El portal con inicio de sesión llega en la siguiente fase.</p></form>
</div></div>`
});

module.exports = { pages, pcard, phead };

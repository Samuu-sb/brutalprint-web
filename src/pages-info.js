/* Páginas informativas y legales */
const { BP, ico } = require('./layout');
const { phead } = require('./pages-main');
const cfg = BP.config;
const $ = BP.money;
const pages = [];
const draft = '<p class="note warn">Texto borrador. Debe ser revisado y aprobado por Brutal Print (y un asesor legal) antes de publicar.</p>';
const info = (file, title, desc, h, sub, body, scripts) => pages.push({ file, title: title + ' | Brutal Print Panamá', desc, scripts, body: `${phead(h, sub)}<div class="page"><div class="wrap"><div class="prose">${body}</div></div></div>` });

/* Técnicas */
pages.push({
  file: 'tecnicas.html', title: 'DTF, serigrafía o sublimación: ¿cuál elegir? | Brutal Print Panamá', desc: 'Compara DTF, serigrafía y sublimación: mínimos, colores, telas, durabilidad y tiempos de entrega.',
  body: `${phead('¿Qué técnica me conviene?', 'Compara las tres y elige según tu pedido.')}
<div class="page"><div class="wrap">
 <div class="tbl-wrap"><table><thead><tr><th></th><th>DTF</th><th>Serigrafía</th><th>Sublimación</th></tr></thead><tbody>
  <tr><td><b>Mejor para</b></td><td>Pocas piezas, full color</td><td>Volumen y logos simples</td><td>Deportivo, tazas, borde a borde</td></tr>
  <tr><td><b>Pedido mínimo</b></td><td class="y">1 pieza</td><td>12 piezas (recomendado)</td><td class="y">1 pieza</td></tr>
  <tr><td><b>Colores</b></td><td>Ilimitados, degradados</td><td>1 a 4 tintas</td><td>Ilimitados</td></tr>
  <tr><td><b>Telas</b></td><td>Algodón, poliéster, mezclas</td><td>Algodón y mezclas</td><td>Poliéster / recubiertos</td></tr>
  <tr><td><b>Durabilidad</b></td><td>Alta</td><td class="y">Muy alta</td><td class="y">Permanente</td></tr>
  <tr><td><b>Precio en volumen</b></td><td>Medio</td><td class="y">El más bajo</td><td>Medio</td></tr>
  <tr><td><b>Entrega</b></td><td>${cfg.leadTimes.dtf}</td><td>${cfg.leadTimes.serigrafia}</td><td>${cfg.leadTimes.sublimacion}</td></tr>
 </tbody></table></div>
 <div class="grid g3" style="margin-top:2.5rem">${Object.entries(BP.techniques).map(([k, t]) => `<div class="card"><h3>${t.name}</h3><p style="margin:.6rem 0">${t.desc}</p><a class="btn sm" href="tienda.html?t=${k}">Ver productos</a></div>`).join('')}</div>
 <p class="note" style="margin-top:2rem">¿No sabes cuál elegir? <a class="link" href="${BP.wa('Hola Brutal Print, necesito ayuda para elegir la técnica de mi pedido.')}" target="_blank" rel="noopener">Escríbenos</a> y te recomendamos la mejor según cantidad, tela y presupuesto.</p>
</div></div>`
});

info('envios.html', 'Envíos y entregas', 'Retiro en taller y envíos a todo Panamá. Tiempos de producción y costos de entrega.', 'Envíos y entregas', 'Retiro, entrega local y envío al interior.', `
<h2>Tiempos de producción</h2>
<ul><li><b>DTF:</b> ${cfg.leadTimes.dtf}</li><li><b>Sublimación:</b> ${cfg.leadTimes.sublimacion}</li><li><b>Serigrafía:</b> ${cfg.leadTimes.serigrafia}</li></ul>
<p>Los plazos cuentan desde la aprobación de la prueba de diseño y la confirmación del abono. Pedidos grandes o fechas de temporada pueden requerir más tiempo; siempre te confirmamos la fecha por WhatsApp.</p>
<h2>Opciones de entrega</h2>
<ul>${Object.values(cfg.shipping).map(s => `<li><b>${s.label}:</b> ${s.price ? $(s.price) : 'gratis'}</li>`).join('')}</ul>
<p>Envío gratis en pedidos desde ${$(cfg.freeShippingOver)} dentro de la ciudad. <em>(Tarifas de ejemplo.)</em></p>
<h2>Cómo recibes tu pedido</h2><p>Te avisamos por WhatsApp cuando esté listo. Puedes seguirlo en <a class="link" href="seguimiento.html">Seguimiento de pedido</a>.</p>${draft}`);

info('devoluciones.html', 'Cambios y garantía', 'Política de cambios, reposiciones y garantía en productos personalizados.', 'Cambios y garantía', 'Qué pasa si algo no sale como esperabas.', `
<h2>Productos personalizados</h2><p>Como cada pieza se produce a pedido con tu diseño, no hacemos cambios ni devoluciones por gusto o talla elegida. Por eso enviamos una prueba de diseño que apruebas antes de imprimir.</p>
<h2>Reposición sin costo</h2><ul><li>Error de impresión respecto al diseño aprobado.</li><li>Defecto de fabricación de la prenda.</li><li>Pieza dañada en el proceso.</li></ul>
<p>Reporta el problema dentro de las 48 horas de recibir el pedido, con fotos, por WhatsApp.</p>
<h2>Cuidado de la prenda</h2><p>Lavar del revés, con agua fría o tibia, sin blanqueador ni secadora a alta temperatura, para prolongar la vida del estampado.</p>${draft}`);

pages.push({
  file: 'faq.html', title: 'Preguntas frecuentes | Brutal Print Panamá', desc: 'Respuestas sobre mínimos, técnicas, pagos, plazos, envíos y recompra.',
  jsonld: { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: BP.faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
  body: `${phead('Preguntas frecuentes')}<div class="page"><div class="wrap" style="max-width:860px">${BP.faq.map(f => `<details class="faq"><summary>${f.q}</summary><div class="a">${f.a}</div></details>`).join('')}
  <p style="margin-top:2rem">¿No encuentras tu respuesta? <a class="link" href="${BP.wa()}" target="_blank" rel="noopener">Escríbenos por WhatsApp</a>.</p></div></div>`
});

pages.push({
  file: 'contacto.html', title: 'Contacto | Brutal Print Panamá', desc: 'Escríbenos por WhatsApp, Instagram o correo. Visita el taller en Panamá.', scripts: ['contacto'],
  body: `${phead('Contacto', 'La forma más rápida es WhatsApp.')}
<div class="page"><div class="wrap two">
 <div class="grid" style="gap:1rem">
  <div class="card"><h3>WhatsApp</h3><p style="margin:.4rem 0 1rem">${cfg.whatsappDisplay}</p><a class="btn wa" href="${BP.wa()}" target="_blank" rel="noopener">${ico.wa} Abrir chat</a></div>
  <div class="card"><h3>Instagram</h3><p style="margin:.4rem 0 1rem">@${cfg.instagram}</p><a class="btn alt" href="https://instagram.com/${cfg.instagram}" target="_blank" rel="noopener">Ver perfil</a></div>
  <div class="card"><h3>Correo</h3><p><a class="link" href="mailto:${cfg.email}">${cfg.email}</a></p><h3 style="margin-top:1.2rem">Taller</h3><p>${cfg.address}<br>${cfg.hours}</p></div>
 </div>
 <form class="card" id="cForm"><h3 style="margin-bottom:1rem">Envíanos un mensaje</h3>
  <div class="field"><label class="f" for="cNm">Nombre</label><input id="cNm" type="text" required></div>
  <div class="field"><label class="f" for="cMsg">Mensaje</label><textarea id="cMsg" required></textarea></div>
  <button class="btn wa" type="submit">${ico.wa} Enviar por WhatsApp</button></form>
</div></div>`
});

info('nosotros.html', 'Sobre nosotros', 'Brutal Print Panamá: taller de serigrafía, DTF y sublimación.', 'Sobre nosotros', 'Taller de estampado en Panamá.', `
<p class="lead">Somos un taller de serigrafía, DTF y sublimación en Panamá. Convertimos ideas en prendas y productos con acabado profesional, desde una pieza hasta producción por volumen.</p>
<h2>Lo que nos mueve</h2><ul><li><b>Calidad sin vueltas:</b> aprobamos el arte contigo antes de producir.</li><li><b>Precios claros:</b> mientras más pides, menos pagas por pieza.</li><li><b>Hecho en Panamá:</b> producción local, con entregas a todo el país.</li></ul>
<p class="note">Texto de ejemplo: completar con la historia real de Brutal Print, el equipo y fotos del taller.</p>`);

info('terminos.html', 'Términos y condiciones', 'Términos y condiciones de compra de Brutal Print Panamá.', 'Términos y condiciones', '', `
<h2>1. Pedidos</h2><p>Un pedido se confirma al aprobar la prueba de diseño y recibir el abono (${cfg.depositPct}% o el total).</p>
<h2>2. Arte y propiedad intelectual</h2><p>El cliente declara tener derechos sobre los diseños y logos que envía. Brutal Print puede rechazar diseños que infrinjan derechos de terceros.</p>
<h2>3. Pagos</h2><p>Aceptamos Yappy, transferencia/ACH, tarjeta mediante enlace de pago y efectivo en el taller.</p>
<h2>4. Plazos</h2><p>Los plazos son estimados y comienzan al aprobar el diseño y confirmar el abono.</p>
<h2>5. Cambios y garantía</h2><p>Ver <a class="link" href="devoluciones.html">Cambios y garantía</a>.</p>${draft}`);

info('privacidad.html', 'Política de privacidad', 'Cómo Brutal Print Panamá trata tus datos personales.', 'Política de privacidad', '', `
<h2>Datos que usamos</h2><p>Nombre, teléfono y datos de entrega que nos compartes al hacer un pedido, solo para gestionarlo y contactarte.</p>
<h2>Almacenamiento en este sitio</h2><p>El carrito y tus pedidos recientes se guardan en tu propio navegador (localStorage). Los logos que subes al personalizador no se envían a ningún servidor.</p>
<h2>Analítica</h2><p>Con tu consentimiento podemos usar herramientas como Meta Pixel y Google Analytics para medir visitas y mejorar la publicidad.</p>
<h2>Tus derechos</h2><p>Puedes pedirnos acceso, corrección o eliminación de tus datos escribiendo a ${cfg.email}.</p>${draft}`);

module.exports = { pages };

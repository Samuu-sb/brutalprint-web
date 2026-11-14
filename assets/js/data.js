/* ============================================================
   Datos del catálogo. PRECIOS Y TEXTOS = PLACEHOLDER (USD).
   ============================================================ */
(function (BP) {
  const C = (n, hex) => ({ n, hex });
  const dark = [C('Negro', '#111113'), C('Blanco', '#F4F1EA'), C('Gris carbón', '#3A3A3F'), C('Rojo', '#C8281E'), C('Azul marino', '#16264A'), C('Ámbar', '#FDA823')];
  const light = [C('Blanco', '#F4F1EA'), C('Negro', '#111113'), C('Ámbar', '#FDA823')];
  const sizesAdult = ['S', 'M', 'L', 'XL', '2XL'];

  BP.tiers = [
    { min: 1, max: 11, mult: 1, label: '1 – 11' },
    { min: 12, max: 23, mult: 0.9, label: '12 – 23' },
    { min: 24, max: 49, mult: 0.82, label: '24 – 49' },
    { min: 50, max: 99, mult: 0.75, label: '50 – 99' },
    { min: 100, max: Infinity, mult: 0.68, label: '100 +' }
  ];
  BP.tierFor = q => BP.tiers.find(t => q >= t.min && q <= t.max) || BP.tiers[0];
  BP.unitPrice = (p, q) => Math.round(p.price * BP.tierFor(q).mult * 100) / 100;
  BP.money = n => BP.config.currency + (Math.round(n * 100) / 100).toFixed(2);

  BP.techniques = {
    dtf: { name: 'DTF', tag: 'Full color · sin mínimo', desc: 'Impresión directa a película y transferencia térmica. Ideal para diseños a todo color, degradados y pedidos pequeños. Funciona en algodón, poliéster y mezclas.', best: ['Pedidos de 1 a 50 piezas', 'Diseños con muchos colores o fotos', 'Telas oscuras y de colores'], min: 1, lead: 'dtf' },
    serigrafia: { name: 'Serigrafía', tag: 'Mejor precio por volumen', desc: 'El método clásico: tinta que se integra a la tela, muy duradera y con colores sólidos intensos. El precio baja fuerte a partir de 24 piezas.', best: ['Pedidos desde 24 piezas', 'Logos de 1 a 4 tintas', 'Uniformes y producción recurrente'], min: 12, lead: 'serigrafia' },
    sublimacion: { name: 'Sublimación', tag: 'Impresión total', desc: 'La tinta se fusiona con el poliéster o superficies recubiertas: color permanente, sin textura y con impresión de borde a borde.', best: ['Uniformes deportivos', 'Tazas, termos y regalos', 'Diseños de borde a borde'], min: 1, lead: 'sublimacion' }
  };

  BP.categories = [
    { id: 'camisetas', name: 'Camisetas' },
    { id: 'hoodies', name: 'Hoodies y polos' },
    { id: 'deportivo', name: 'Deportivo sublimado' },
    { id: 'gorras', name: 'Gorras' },
    { id: 'tazas', name: 'Tazas y termos' },
    { id: 'bolsas', name: 'Bolsas' }
  ];

  BP.products = [
    { id: 'camiseta-clasica', name: 'Camiseta clásica 100% algodón', cat: 'camisetas', techs: ['dtf', 'serigrafia'], price: 9.5, colors: dark, sizes: sizesAdult, shape: 'tee', badge: 'Más pedida', desc: 'Corte regular, algodón peinado de 180 g. La base de todo pedido: uniformes, eventos, emprendimientos.', bullets: ['Incluye 1 diseño en 1 ubicación (hasta tamaño carta)', 'Tallas S a 2XL', 'Ubicación extra: +$2.00 por pieza'] },
    { id: 'camiseta-oversize', name: 'Camiseta oversize premium', cat: 'camisetas', techs: ['dtf', 'serigrafia'], price: 13.5, colors: dark.slice(0, 4), sizes: sizesAdult, shape: 'tee', badge: 'Streetwear', desc: 'Caída ancha, algodón pesado de 220 g. Para marcas de ropa y colecciones cápsula.', bullets: ['Algodón 220 g', 'Ideal para diseños grandes en espalda', 'Etiqueta propia disponible (consultar)'] },
    { id: 'camiseta-dryfit', name: 'Camiseta dry-fit sublimada', cat: 'deportivo', techs: ['sublimacion'], price: 14.5, colors: light, sizes: sizesAdult, shape: 'jersey', badge: 'Sublimación total', desc: 'Poliéster respirable con impresión de borde a borde. Colores que no se desgastan ni se agrietan.', bullets: ['Diseño completo en toda la prenda', 'Número y nombre incluidos', 'Pedido mínimo recomendado: 10'] },
    { id: 'jersey-equipo', name: 'Jersey de equipo completo', cat: 'deportivo', techs: ['sublimacion'], price: 22, colors: light, sizes: ['XS', ...sizesAdult, '3XL'], shape: 'jersey', badge: 'Equipos', desc: 'Jersey con diseño 100% personalizado: escudo, patrocinadores, nombre y número. Entregamos prueba de diseño antes de producir.', bullets: ['Diseño por equipo con prueba gratis', 'Mínimo 10 jerseys', 'Short y media disponibles (consultar)'] },
    { id: 'polo-uniforme', name: 'Polo uniforme piqué', cat: 'hoodies', techs: ['dtf', 'serigrafia'], price: 15.5, colors: dark.slice(0, 5), sizes: sizesAdult, shape: 'polo', badge: 'Empresas', desc: 'Polo de piqué con logo bordado o estampado en pecho. El uniforme corporativo estándar.', bullets: ['Logo en pecho incluido', 'Bordado disponible (consultar)', 'Reposición sencilla: guardamos tu arte'] },
    { id: 'hoodie-clasico', name: 'Hoodie con capucha', cat: 'hoodies', techs: ['dtf', 'serigrafia'], price: 28, colors: dark.slice(0, 4), sizes: sizesAdult, shape: 'hoodie', badge: 'Nuevo', desc: 'Felpa interior, capucha forrada y bolsillo canguro. Para graduaciones, grupos y marcas.', bullets: ['Felpa de 320 g', 'Ideal para grados y grupos', 'Espalda grande: +$4.00 por pieza'] },
    { id: 'gorra-trucker', name: 'Gorra con logo', cat: 'gorras', techs: ['dtf', 'sublimacion'], price: 10.5, colors: dark.slice(0, 4), sizes: ['Única'], shape: 'cap', desc: 'Gorra ajustable con panel frontal para tu logo. Perfecta para equipos de trabajo y eventos.', bullets: ['Cierre ajustable', 'Logo frontal incluido', 'Mínimo recomendado: 6'] },
    { id: 'taza-ceramica', name: 'Taza de cerámica 11 oz', cat: 'tazas', techs: ['sublimacion'], price: 7.5, colors: [C('Blanco', '#F4F1EA'), C('Negro', '#111113')], sizes: ['11 oz'], shape: 'mug', badge: 'Regalo', desc: 'Sublimación de alta definición, apta para microondas y lavavajillas. Regalo corporativo o personal.', bullets: ['Impresión de lado a lado', 'Caja de regalo opcional', 'Desde 1 unidad'] },
    { id: 'termo-acero', name: 'Termo de acero inoxidable', cat: 'tazas', techs: ['sublimacion'], price: 18, colors: [C('Blanco', '#F4F1EA'), C('Negro', '#111113'), C('Ámbar', '#FDA823')], sizes: ['20 oz'], shape: 'tumbler', desc: 'Mantiene frío o caliente por horas. Impresión con acabado brillante y duradero.', bullets: ['Acero doble pared', 'Grabado/sublimado a color', 'Desde 1 unidad'] },
    { id: 'tote-bag', name: 'Tote bag de algodón', cat: 'bolsas', techs: ['dtf', 'serigrafia'], price: 6.5, colors: [C('Natural', '#E7DFC9'), C('Negro', '#111113')], sizes: ['Única'], shape: 'tote', desc: 'Bolsa resistente para eventos, ferias y merch. Económica y con mucha visibilidad.', bullets: ['Algodón 8 oz', 'Perfecta para eventos', 'Descuento fuerte desde 50 unidades'] }
  ];
  BP.getProduct = id => BP.products.find(p => p.id === id);

  // Formas vectoriales (viewBox 0 0 200 200) usadas para ilustrar y para el personalizador
  BP.shapes = {
    tee: { body: ['M58 22 L84 14 Q100 36 116 14 L142 22 L184 58 L160 82 L142 70 L142 180 L58 180 L58 70 L40 82 L16 58 Z'], print: { x: 72, y: 56, w: 56, h: 64 } },
    polo: { body: ['M58 22 L84 14 L100 40 L116 14 L142 22 L184 58 L160 82 L142 70 L142 180 L58 180 L58 70 L40 82 L16 58 Z'], extra: ['M84 14 L100 40 L116 14 L108 12 L100 22 L92 12 Z'], print: { x: 108, y: 54, w: 28, h: 28 } },
    jersey: { body: ['M58 22 L86 14 Q100 52 114 14 L142 22 L184 58 L160 82 L142 70 L142 180 L58 180 L58 70 L40 82 L16 58 Z'], print: { x: 72, y: 62, w: 56, h: 58 } },
    hoodie: { body: ['M60 34 L84 22 Q100 44 116 22 L140 34 L188 150 L164 162 L142 106 L142 184 L58 184 L58 106 L36 162 L12 150 Z'], extra: ['M76 24 Q100 -2 124 24 Q100 52 76 24 Z', 'M72 150 L128 150 L136 176 L64 176 Z'], print: { x: 72, y: 66, w: 56, h: 58 } },
    cap: { body: ['M30 112 Q30 38 100 34 Q170 38 170 112 Z'], extra: ['M18 112 Q100 94 182 112 Q196 134 100 142 Q4 134 18 112 Z'], print: { x: 66, y: 56, w: 68, h: 44 } },
    mug: { body: ['M54 46 L142 46 L138 150 Q138 160 128 160 L68 160 Q58 160 58 150 Z'], stroke: ['M141 66 Q184 66 184 102 Q184 138 137 136'], print: { x: 64, y: 62, w: 70, h: 70 } },
    tumbler: { body: ['M66 40 L134 40 L126 176 Q126 184 118 184 L82 184 Q74 184 74 176 Z'], extra: ['M62 22 L138 22 L138 40 L62 40 Z'], print: { x: 78, y: 64, w: 44, h: 86 } },
    tote: { body: ['M42 62 L158 62 L166 184 L34 184 Z'], stroke: ['M72 62 Q72 14 100 14 Q128 14 128 62'], print: { x: 64, y: 86, w: 72, h: 72 } }
  };

  BP.nichos = {
    'uniformes-empresa': { name: 'Uniformes de empresa', icon: '🏢', headline: 'Que tu equipo se vea como una marca', sub: 'Polos, camisetas y gorras con tu logo, tallas surtidas y reposición rápida cuando entra personal nuevo.', techs: ['serigrafia', 'dtf'], products: ['polo-uniforme', 'camiseta-clasica', 'gorra-trucker'], points: ['Guardamos tu arte: reordenar es un mensaje de WhatsApp', 'Colores corporativos igualados a tu referencia', 'Factura y plazo de entrega comprometido', 'Precio por volumen desde 12 piezas'], example: 'Ejemplo: 30 polos con logo en pecho y 30 gorras para una constructora.', msg: 'uniformes de empresa' },
    'equipos-deportivos': { name: 'Equipos deportivos', icon: '⚽', headline: 'Jerseys que la cancha no olvida', sub: 'Sublimación total con tu escudo, patrocinadores, nombre y número de cada jugador.', techs: ['sublimacion'], products: ['jersey-equipo', 'camiseta-dryfit', 'gorra-trucker'], points: ['Prueba de diseño gratis antes de producir', 'Nombres y números por jugador incluidos', 'Poliéster respirable que no se desgasta', 'Precio especial para ligas y colegios'], example: 'Ejemplo: 14 jerseys de fútbol 7 con patrocinadores en espalda.', msg: 'equipos deportivos' },
    graduaciones: { name: 'Graduaciones', icon: '🎓', headline: 'El recuerdo que se lleva puesto', sub: 'Hoodies, camisetas y gorras para la promoción, con diseño propio del grupo.', techs: ['serigrafia', 'dtf'], products: ['hoodie-clasico', 'camiseta-clasica', 'gorra-trucker'], points: ['Diseños de promoción con nombre de cada estudiante', 'Pedidos grandes con precio por volumen', 'Fechas de entrega con margen antes de la ceremonia', 'Tallas surtidas en un solo pedido'], example: 'Ejemplo: 45 hoodies de promoción con nombre en la manga.', msg: 'graduaciones' },
    eventos: { name: 'Eventos y empresas', icon: '🎟️', headline: 'Merch para eventos, ferias y activaciones', sub: 'Camisetas, tote bags y gorras en poco tiempo, con diseño a todo color.', techs: ['dtf', 'serigrafia'], products: ['camiseta-clasica', 'tote-bag', 'gorra-trucker'], points: ['Producción express en DTF (2–3 días)', 'Tote bags y camisetas con gran visibilidad', 'Entrega en sitio dentro de la ciudad', 'Reimpresión rápida si se agota'], example: 'Ejemplo: 200 tote bags para un festival gastronómico.', msg: 'eventos' },
    iglesias: { name: 'Iglesias y ministerios', icon: '✝️', headline: 'Camisetas para tu comunidad', sub: 'Retiros, campañas, juventud y voluntariado: diseños con propósito a precio accesible.', techs: ['serigrafia', 'dtf'], products: ['camiseta-clasica', 'hoodie-clasico', 'taza-ceramica'], points: ['Precios especiales para ministerios', 'Diseño de camiseta para retiros y campañas', 'Tazas y regalos para líderes y voluntarios', 'Producción por etapas según presupuesto'], example: 'Ejemplo: 60 camisetas para un retiro de jóvenes.', msg: 'iglesia o ministerio' },
    emprendedores: { name: 'Emprendedores', icon: '🚀', headline: 'Lanza tu marca desde 1 pieza', sub: 'Camisetas oversize, hoodies y packaging con tu identidad, sin mínimo en DTF.', techs: ['dtf'], products: ['camiseta-oversize', 'hoodie-clasico', 'tote-bag'], points: ['Sin mínimo: prueba tu diseño con pocas piezas', 'Hojas DTF por metro para tu propia producción', 'Servicio de diseño y vectorización de tu logo', 'Cuenta de mayorista cuando tu marca crezca'], example: 'Ejemplo: colección cápsula de 20 camisetas oversize.', msg: 'mi marca (emprendimiento)' }
  };

  BP.services = [
    { id: 'vectorizacion', name: 'Vectorización de logo', price: 12, note: 'Convertimos tu logo a vector para serigrafía y bordado.' },
    { id: 'diseno', name: 'Diseño de estampado', price: 25, note: 'Diseño original basado en tu idea y referencias.' },
    { id: 'prueba', name: 'Mockup / prueba de diseño', price: 0, note: 'Siempre incluido: aprueba el arte antes de imprimir.' }
  ];

  BP.faq = [
    { q: '¿Cuál es el pedido mínimo?', a: 'En DTF y sublimación puedes pedir desde 1 pieza. En serigrafía recomendamos desde 12 porque el costo de preparar las pantallas se reparte entre más prendas.' },
    { q: '¿Qué diferencia hay entre DTF, serigrafía y sublimación?', a: 'DTF: full color y sin mínimo, sobre casi cualquier tela. Serigrafía: la más económica en volumen, colores sólidos y muy durable. Sublimación: impresión de borde a borde sobre poliéster o superficies recubiertas (tazas, termos, jerseys).' },
    { q: '¿En qué formato debo enviar mi logo?', a: 'Lo ideal es vector (AI, EPS, PDF o SVG). Si solo tienes PNG o JPG, lo revisamos gratis; si hace falta rehacerlo, ofrecemos vectorización como servicio.' },
    { q: '¿Veré cómo queda antes de producir?', a: 'Sí. Siempre enviamos una prueba de diseño (mockup) para tu aprobación antes de imprimir.' },
    { q: '¿Cómo funciona el abono del 50%?', a: 'Para pedidos personalizados pagas el 50% al aprobar el diseño y el resto al retirar o antes del envío.' },
    { q: '¿Qué métodos de pago aceptan?', a: 'Yappy, transferencia/ACH, tarjeta (por enlace de pago) y efectivo al retirar en el taller.' },
    { q: '¿Cuánto tardan los pedidos?', a: 'DTF: 2–3 días hábiles. Sublimación: 3–5. Serigrafía: 5–7. Los plazos corren desde la aprobación del diseño y el abono.' },
    { q: '¿Hacen envíos al interior del país?', a: 'Sí, enviamos a todo Panamá. Entregamos en la ciudad y coordinamos transporte para el interior.' },
    { q: '¿Puedo devolver un producto personalizado?', a: 'Al ser personalizados no aplican cambios por gusto o talla. Si hay un error de impresión o un defecto, lo reponemos sin costo.' },
    { q: '¿Cómo reordeno un pedido anterior?', a: 'Guardamos tus artes aprobados. Escríbenos con tu número de pedido o usa tu cuenta de mayorista para repetirlo en un clic.' }
  ];

  // TEXTO DE EJEMPLO. Reemplazar por reseñas reales de clientes (Google / Instagram) antes de publicar.
  BP.reviews = [
    { name: 'Nombre del cliente', role: 'Uniformes de empresa', stars: 5, text: 'Aquí va una reseña real de un cliente satisfecho sobre la calidad y los tiempos de entrega.', placeholder: true },
    { name: 'Nombre del cliente', role: 'Equipo deportivo', stars: 5, text: 'Aquí va una reseña real sobre los jerseys sublimados y la prueba de diseño.', placeholder: true },
    { name: 'Nombre del cliente', role: 'Emprendimiento', stars: 5, text: 'Aquí va una reseña real de un emprendedor que empezó con pocas piezas.', placeholder: true }
  ];

  BP.orderStates = ['Recibido', 'Diseño aprobado', 'Pago confirmado', 'En producción', 'Listo', 'Entregado'];
})(window.BP = window.BP || {});

# Brutal Print Panamá — Web v1 (prototipo)

Sitio estático (HTML/CSS/JS, sin dependencias de runtime). Cumple la checklist mínima y aplica las mejoras del análisis de metalshop.es (`../analisis-metalshop-brutalprint.md`).

## Ver el sitio
Servir la carpeta con cualquier servidor estático, por ejemplo:
```
python -m http.server 8765
```
y abrir http://localhost:8765/index.html

## Editar y regenerar
Las páginas HTML se **generan** con Node (sin instalar nada):
```
node src/build.js
```
- `assets/js/config.js` — WhatsApp, Yappy, banco, envíos, plazos, IDs de analítica. **Todo marcado PLACEHOLDER.**
- `assets/js/data.js` — productos, precios por volumen, nichos, FAQ, reseñas de ejemplo.
- `src/pages-main.js`, `src/pages-info.js`, `src/layout.js` — contenido y plantilla.
- Marca: `assets/img/` (logos y emblema extraídos de `BrutalPrint Rebrand.ai`). Paleta: negro #0B0B0C, ámbar #FDA823, hueso #F5F2EA. Fuentes: Anton, Inter, Permanent Marker.

## Qué incluye
Home, tienda con filtros y búsqueda, ficha por producto (precio por volumen en vivo), carrito con avisos de ahorro, checkout con abono 50 % (Yappy / transferencia / tarjeta por enlace / efectivo), cotizador → WhatsApp, personalizador con vista previa (sube logo, mueve, descarga), tabla de precios, 6 páginas por nicho, DTF por metro con armado de hoja, seguimiento de pedido, mayoristas, portafolio, técnicas, envíos, cambios, FAQ, contacto, legales, sitemap y robots, SEO básico y JSON-LD, analítica con consentimiento.

## Pendiente antes de publicar
1. Reemplazar TODOS los placeholders (teléfono, Yappy, cuenta bancaria, dirección, horarios, precios, plazos, tarifas de envío).
2. Fotos reales de productos y portafolio; reseñas reales (las actuales están marcadas "Ejemplo").
3. Revisión legal de términos y privacidad (son borradores).
4. Pasarela de tarjeta (PagueloFacil / Tilopay): hoy se paga por enlace enviado por WhatsApp.
5. Backend: los pedidos y el seguimiento viven en el navegador del cliente (localStorage). Para estados reales se necesita base de datos y panel de administración.
6. Cuentas de mayorista con login y recompra real (hoy es una solicitud por WhatsApp).
7. Dominio, hosting, IDs de Meta Pixel / GA4 y Google Business Profile.

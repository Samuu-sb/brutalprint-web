/* Vistas previas del personalizador.
   POST /api/vista      -> guarda la imagen y devuelve { url } para pegarla en el mensaje de WhatsApp
   GET  /vista/<id>     -> sirve la imagen (el enlace que recibe Brutal Print)
   Se guardan en Netlify Blobs; solo se sube cuando el cliente toca "Pedir con esta vista previa". */
import { getStore } from '@netlify/blobs';

const MAX_BYTES = 3 * 1024 * 1024;
const ID = /^[a-f0-9]{20}$/;
const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });

// Solo PNG, JPEG o WebP reales (se mira la firma del archivo, no solo el content-type)
function kind(b) {
  const u = new Uint8Array(b.slice(0, 12));
  if (u[0] === 0x89 && u[1] === 0x50 && u[2] === 0x4e && u[3] === 0x47) return 'image/png';
  if (u[0] === 0xff && u[1] === 0xd8 && u[2] === 0xff) return 'image/jpeg';
  if (u[0] === 0x52 && u[1] === 0x49 && u[2] === 0x46 && u[3] === 0x46 && u[8] === 0x57 && u[9] === 0x45 && u[10] === 0x42 && u[11] === 0x50) return 'image/webp';
  return null;
}

export async function handle(req, store) {
  const url = new URL(req.url);
  if (req.method === 'POST') {
    const len = +req.headers.get('content-length') || 0;
    if (len > MAX_BYTES) return json({ error: 'Imagen demasiado grande' }, 413);
    const buf = await req.arrayBuffer();
    if (!buf.byteLength || buf.byteLength > MAX_BYTES) return json({ error: 'Imagen inválida' }, 413);
    const type = kind(buf);
    if (!type) return json({ error: 'Formato no permitido' }, 415);
    const id = Array.from(crypto.getRandomValues(new Uint8Array(10)), x => x.toString(16).padStart(2, '0')).join('');
    await store.set(id, buf, { metadata: { type, createdAt: Date.now() } });
    return json({ url: url.origin + '/vista/' + id });
  }
  if (req.method === 'GET') {
    const id = url.pathname.split('/').pop();
    if (!ID.test(id)) return new Response('No encontrado', { status: 404 });
    const r = await store.getWithMetadata(id, { type: 'arrayBuffer' });
    if (!r) return new Response('No encontrado', { status: 404 });
    return new Response(r.data, { headers: { 'content-type': (r.metadata && r.metadata.type) || 'image/png', 'cache-control': 'public, max-age=31536000, immutable', 'x-content-type-options': 'nosniff', 'content-disposition': 'inline; filename="vista-previa-brutalprint.png"' } });
  }
  return new Response('Método no permitido', { status: 405, headers: { allow: 'GET, POST' } });
}

export default async (req) => handle(req, getStore('vistas-previas'));
export const config = { path: ['/api/vista', '/vista/*'] };

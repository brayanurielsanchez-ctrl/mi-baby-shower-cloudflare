// Cloudflare Pages Function: /api/revelacion
// La respuesta no se publica en el repositorio: configure REVELACION_EQUIPO
// en Settings > Variables and Secrets de Cloudflare Pages.
const headers = { 'Cache-Control': 'no-store' };
const json = (value, status = 200) => Response.json(value, { status, headers });
export async function onRequestGet({ request, env }) {
  if (!env.DB) return json({ error: 'Base de datos no conectada' }, 503);
  const token = (new URL(request.url).searchParams.get('token') || '').trim();
  if (token.length < 8 || token.length > 100) return json({ error: 'Primero vota para ver la sorpresa' }, 403);
  try {
    const voto = await env.DB.prepare('SELECT id FROM votos WHERE token = ?').bind(token).first();
    if (!voto) return json({ error: 'Primero vota para ver la sorpresa' }, 403);
  } catch (e) {
    console.error('revelacion DB:', e);
    return json({ error: 'No se pudo verificar el voto' }, 500);
  }
  const equipo = String(env.REVELACION_EQUIPO || '').trim().toLowerCase();
  if (!['nino', 'nina'].includes(equipo)) return json({ error: 'La sorpresa todavía no está configurada' }, 503);
  const nino = equipo === 'nino';
  return json({
    equipo,
    titulo: nino ? '¡ES NIÑO!' : '¡ES NIÑA!',
    mensaje: nino ? '¡Un pequeño príncipe viene en camino!' : '¡Una pequeña princesa viene en camino!',
    decoracion: nino ? '🎈 💙 🍼 💙 🎈' : '🎈 💗 🍼 💗 🎈',
    color: nino ? '#4b9bd8' : '#dc77aa',
    fondo: nino ? 'radial-gradient(circle, #ffffff, #d8eeff, #9bcff5)' : 'radial-gradient(circle, #ffffff, #ffe2ef, #f8b4d0)',
    confeti: nino
      ? ['#4b9bd8', '#91c9f7', '#d8eeff', '#ffffff', '#d6b66d', '#a8d6f8']
      : ['#dc77aa', '#ffc3dd', '#ffe2ef', '#ffffff', '#d6b66d', '#f7a6cc']
  });
}

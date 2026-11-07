// Cloudflare Pages Function: /api/deseos
const headers = { 'Cache-Control': 'no-store' };
const json = (value, status = 200) => Response.json(value, { status, headers });
const clean = (s, max) => typeof s === 'string' ? s.trim().slice(0, max) : '';
export async function onRequest({ request, env }) {
  if (!env.DB) return json({ error: 'Falta conectar la base de datos DB' }, 503);
  try {
    if (request.method === 'GET') {
      const { results } = await env.DB.prepare(`SELECT id, nombre, mensaje, created_at AS fecha
        FROM deseos ORDER BY id DESC LIMIT 200`).all();
      return json(results);
    }
    if (request.method === 'POST') {
      let body;
      try { body = await request.json(); } catch { return json({ error: 'Datos inválidos' }, 400); }
      if (clean(body?.campoRobot, 200)) return json({ ok: true }, 201);
      const nombre = clean(body?.nombre, 80), mensaje = clean(body?.mensaje, 1000);
      if (!nombre || !mensaje) return json({ error: 'Escribe tu nombre y tu mensaje' }, 400);
      const nuevo = await env.DB.prepare(`INSERT INTO deseos (nombre, mensaje)
        VALUES (?, ?) RETURNING id, nombre, mensaje, created_at AS fecha`).bind(nombre, mensaje).first();
      return json(nuevo, 201);
    }
    return json({ error: 'Método no permitido' }, 405);
  } catch (e) {
    console.error('deseos:', e);
    return json({ error: 'Error interno en el libro de deseos' }, 500);
  }
}

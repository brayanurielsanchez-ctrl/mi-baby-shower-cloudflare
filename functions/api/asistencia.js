// Cloudflare Pages Function: /api/asistencia
const headers = { 'Cache-Control': 'no-store' };
const json = (value, status = 200) => Response.json(value, { status, headers });
const clean = (s, max) => typeof s === 'string' ? s.trim().slice(0, max) : '';
export async function onRequest({ request, env }) {
  if (!env.DB) return json({ error: 'Falta conectar la base de datos DB' }, 503);
  try {
    if (request.method === 'GET') {
      // No revelar nombres ni identificadores privados de los invitados.
      const row = await env.DB.prepare(`SELECT
        COALESCE(SUM(CASE WHEN asiste = 1 THEN personas ELSE 0 END), 0) AS totalPersonas,
        COALESCE(SUM(CASE WHEN asiste = 1 THEN 1 ELSE 0 END), 0) AS confirmados,
        COALESCE(SUM(CASE WHEN asiste = 0 THEN 1 ELSE 0 END), 0) AS noAsisten
        FROM asistencias`).first();
      return json(row);
    }
    if (request.method === 'POST') {
      let body;
      try { body = await request.json(); } catch { return json({ error: 'Datos inválidos' }, 400); }
      if (clean(body?.campoRobot, 200)) return json({ ok: true }, 201);
      const token = clean(body?.token, 100), nombre = clean(body?.nombre, 80);
      const asiste = body?.asiste === true ? 1 : 0;
      const personas = asiste ? Math.min(10, Math.max(1, Math.round(Number(body?.personas) || 1))) : 0;
      if (token.length < 16 || !nombre) return json({ error: 'Escribe tu nombre para confirmar' }, 400);
      await env.DB.prepare(`INSERT INTO asistencias (token, nombre, asiste, personas)
        VALUES (?, ?, ?, ?) ON CONFLICT(token) DO UPDATE SET
        nombre = excluded.nombre, asiste = excluded.asiste,
        personas = excluded.personas, updated_at = CURRENT_TIMESTAMP`)
        .bind(token, nombre, asiste, personas).run();
      return json({ ok: true, nombre, asiste: !!asiste, personas }, 201);
    }
    return json({ error: 'Método no permitido' }, 405);
  } catch (e) {
    console.error('asistencia:', e);
    return json({ error: 'Error interno al confirmar asistencia' }, 500);
  }
}

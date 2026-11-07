// Cloudflare Pages Function: /api/votos
const headers = { 'Cache-Control': 'no-store' };
const json = (value, status = 200) => Response.json(value, { status, headers });
const allowed = new Set(['nina', 'nino']);
const validToken = (s) => typeof s === 'string' && s.trim().length >= 8 && s.trim().length <= 100;

async function totals(db) {
  const { results } = await db.prepare('SELECT equipo, COUNT(*) AS total FROM votos GROUP BY equipo').all();
  const result = { nina: 0, nino: 0 };
  for (const row of results) if (allowed.has(row.equipo)) result[row.equipo] = Number(row.total);
  return result;
}

export async function onRequest({ request, env }) {
  if (!env.DB) return json({ error: 'Falta conectar la base de datos DB' }, 503);
  const url = new URL(request.url);
  const token = (url.searchParams.get('token') || '').trim().slice(0, 100);
  try {
    if (request.method === 'GET') {
      const row = validToken(token)
        ? await env.DB.prepare('SELECT equipo FROM votos WHERE token = ?').bind(token).first()
        : null;
      return json({ ...await totals(env.DB), miVoto: row?.equipo || null });
    }
    if (request.method === 'POST') {
      let body;
      try { body = await request.json(); } catch { return json({ error: 'Datos inválidos' }, 400); }
      const t = typeof body?.token === 'string' ? body.token.trim() : '';
      const equipo = body?.equipo;
      if (!validToken(t) || !allowed.has(equipo)) return json({ error: 'Voto inválido' }, 400);
      await env.DB.prepare(`INSERT INTO votos (token, equipo)
        VALUES (?, ?) ON CONFLICT(token) DO UPDATE SET
        equipo = excluded.equipo, updated_at = CURRENT_TIMESTAMP`).bind(t, equipo).run();
      return json({ ...await totals(env.DB), miVoto: equipo });
    }
    if (request.method === 'DELETE') {
      if (!validToken(token)) return json({ error: 'Token inválido' }, 400);
      await env.DB.prepare('DELETE FROM votos WHERE token = ?').bind(token).run();
      return json({ ...await totals(env.DB), miVoto: null });
    }
    return json({ error: 'Método no permitido' }, 405);
  } catch (e) {
    console.error('votos:', e);
    return json({ error: 'Error interno al procesar los votos' }, 500);
  }
}

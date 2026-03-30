export const prerender = false;

import type { APIRoute } from 'astro';
import { getSession } from '../../lib/auth';

export const GET: APIRoute = async ({ request }) => {
  const session = await getSession(request.headers.get('cookie'));

  if (!session) {
    return new Response(JSON.stringify({ authenticated: false }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(
    JSON.stringify({
      authenticated: true,
      user: {
        login: session.login,
        name: session.name,
        avatarUrl: session.avatarUrl,
      },
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
};

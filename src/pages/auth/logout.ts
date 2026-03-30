export const prerender = false;

import type { APIRoute } from 'astro';
import { clearSessionCookie } from '../../lib/auth';

export const GET: APIRoute = async ({ url }) => {
  return new Response(null, {
    status: 302,
    headers: {
      Location: `${url.origin}/`,
      'Set-Cookie': clearSessionCookie(),
    },
  });
};

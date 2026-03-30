export const prerender = false;

import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
  const clientId = import.meta.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return new Response('GitHub OAuth not configured', { status: 500 });
  }

  const redirectUri = `${url.origin}/auth/callback`;
  const githubUrl = new URL('https://github.com/login/oauth/authorize');
  githubUrl.searchParams.set('client_id', clientId);
  githubUrl.searchParams.set('redirect_uri', redirectUri);
  githubUrl.searchParams.set('scope', 'public_repo');

  return Response.redirect(githubUrl.toString(), 302);
};

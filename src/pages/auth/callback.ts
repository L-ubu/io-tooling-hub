export const prerender = false;

import type { APIRoute } from 'astro';
import { createSession, sessionCookie } from '../../lib/auth';

export const GET: APIRoute = async ({ url }) => {
  const code = url.searchParams.get('code');
  if (!code) {
    return Response.redirect(`${url.origin}/submit?error=no_code`, 302);
  }

  const clientId = import.meta.env.GITHUB_CLIENT_ID;
  const clientSecret = import.meta.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return new Response('OAuth not configured', { status: 500 });
  }

  // Exchange code for access token
  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
    }),
  });

  const tokenData = await tokenRes.json();
  if (tokenData.error || !tokenData.access_token) {
    return Response.redirect(`${url.origin}/submit?error=auth_failed`, 302);
  }

  // Fetch user info
  const userRes = await fetch('https://api.github.com/user', {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });
  const userData = await userRes.json();

  // Create session JWT
  const jwt = await createSession({
    token: tokenData.access_token,
    login: userData.login,
    name: userData.name || userData.login,
    avatarUrl: userData.avatar_url,
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: `${url.origin}/submit`,
      'Set-Cookie': sessionCookie(jwt),
    },
  });
};

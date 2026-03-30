import * as jose from 'jose';

const COOKIE_NAME = 'io_hub_session';

export interface SessionUser {
  token: string;
  login: string;
  name: string;
  avatarUrl: string;
}

function getSecret(): Uint8Array {
  const secret = import.meta.env.AUTH_SECRET;
  if (!secret) throw new Error('AUTH_SECRET not configured');
  return new TextEncoder().encode(secret);
}

export async function createSession(user: SessionUser): Promise<string> {
  const jwt = await new jose.SignJWT({
    token: user.token,
    login: user.login,
    name: user.name,
    avatarUrl: user.avatarUrl,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecret());

  return jwt;
}

export async function getSession(cookieHeader: string | null): Promise<SessionUser | null> {
  if (!cookieHeader) return null;

  const match = cookieHeader.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  if (!match) return null;

  try {
    const { payload } = await jose.jwtVerify(match[1], getSecret());
    return {
      token: payload.token as string,
      login: payload.login as string,
      name: payload.name as string,
      avatarUrl: payload.avatarUrl as string,
    };
  } catch {
    return null;
  }
}

export function sessionCookie(jwt: string): string {
  return `${COOKIE_NAME}=${jwt}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`;
}

export function clearSessionCookie(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

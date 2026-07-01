import { validateAdminAuth, generateSessionToken, setAdminSession, checkRateLimit, validateCSRFToken, getCSRFToken } from '@/app/admin/auth';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';

  // Check rate limit
  if (!checkRateLimit(ip)) {
    return Response.json({ error: 'Too many login attempts. Please try again later.' }, { status: 429 });
  }

  const { password, csrfToken } = await request.json();

  // Validate CSRF token
  const storedToken = await getCSRFToken();
  if (!validateCSRFToken(csrfToken, storedToken)) {
    return Response.json({ error: 'Invalid request' }, { status: 403 });
  }

  if (validateAdminAuth(password)) {
    const token = generateSessionToken();
    await setAdminSession(token);
    return Response.json({ ok: true });
  }

  return Response.json({ error: 'Invalid password' }, { status: 401 });
}

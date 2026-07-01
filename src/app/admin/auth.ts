import { cookies } from 'next/headers';
import crypto from 'crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_ATTEMPTS = 5;

// In-memory rate limiting (use Redis in production)
const rateLimitMap = new Map<string, { attempts: number; resetTime: number }>();

export function validateAdminAuth(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export async function setCSRFToken(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set('csrf-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60, // 1 hour
    path: '/',
  });
}

export async function getCSRFToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get('csrf-token')?.value || null;
}

export function validateCSRFToken(token: string | null, storedToken: string | null): boolean {
  if (!token || !storedToken) return false;
  return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(storedToken));
}

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { attempts: 0, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.attempts >= RATE_LIMIT_MAX_ATTEMPTS) {
    return false;
  }

  record.attempts++;
  return true;
}

export async function setAdminSession(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set('admin-session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000, // Convert ms to seconds
    path: '/admin',
  });
}

export async function getAdminSession(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get('admin-session')?.value || null;
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('admin-session');
}

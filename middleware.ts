import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Enforce HTTPS for admin routes in production
  if (process.env.NODE_ENV === 'production' && request.headers.get('x-forwarded-proto') !== 'https') {
    return NextResponse.redirect(`https://${request.headers.get('host')}${pathname}`, { status: 301 });
  }

  // Only protect /admin/editor - /admin (login page) should be accessible
  if (pathname === '/admin/editor') {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('admin-session')?.value;

    // If no session token, redirect to login
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

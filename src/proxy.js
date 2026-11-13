import { NextResponse } from 'next/server';

export function proxy(request) {
  const authToken = request.cookies.get('auth_token')?.value;
  const userRole = request.cookies.get('user_role')?.value;
  const { pathname } = request.nextUrl;

  // SCENARIO 1: Logged-in user tries to visit the login page
  if (authToken && pathname === '/login') {
    if (userRole === 'ADMIN' || userRole === 'SUPERADMIN') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.redirect(new URL('/', request.url));
  }

  // SCENARIO 2: Protect /admin routes
  if (pathname.startsWith('/admin')) {
    if (!authToken) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (userRole !== 'ADMIN' && userRole !== 'SUPERADMIN') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // SCENARIO 3: Protect /premium-resources/* sub-routes (keeps main /premium-resources hub public for SEO)
  if (pathname.startsWith('/premium-resources/')) {
    if (!authToken) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/premium-resources/:path+', // Matches /premium-resources/javascript, etc., but NOT /premium-resources itself
    '/login',
  ],
};
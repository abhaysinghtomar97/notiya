import { NextResponse } from 'next/server';

export function proxy(request) {
  // 1. Fetch exactly the cookie names we set in the API route
  const authToken = request.cookies.get('auth_token')?.value;
  const userRole = request.cookies.get('user_role')?.value;
  const { pathname } = request.nextUrl;

  // SCENARIO 1: Logged-in user tries to visit the login page
  if (authToken && pathname === '/login') {
    // If they are an admin, send them to admin dashboard, else to home
    if (userRole === 'ADMIN' || userRole === 'SUPERADMIN') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.redirect(new URL('/', request.url));
  }

  // SCENARIO 2: Protect /admin routes
  if (pathname.startsWith('/admin')) {
    // If no token, redirect to login
    if (!authToken) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // If they have a token but are NOT an admin, kick them to the homepage
    if (userRole !== 'ADMIN' && userRole !== 'SUPERADMIN') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // SCENARIO 3: All other requests pass through normally
  return NextResponse.next();
}

// Configure the matcher
export const config = {
  matcher: [
    '/admin/:path*', 
    '/login'         
  ],
};
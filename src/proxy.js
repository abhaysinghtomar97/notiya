import { NextResponse } from 'next/server';

export function proxy(request) {
  
  const authToken = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // SCENARIO 1: Logged-in user tries to visit the login page
  if (authToken && pathname === '/login') {
    // Redirect them to the dashboard (or home page). 
    // We use /admin/dashboard here as the default safe place for an admin.
    return NextResponse.redirect(new URL('/', request.url));
  }

  // SCENARIO 2: Logged-out user tries to visit any /admin page
  if (!authToken && pathname.startsWith('/admin')) {
    const loginUrl = new URL('/login', request.url);
    
    // Optional: Save the URL they were trying to visit so you can send them 
    // there after a successful login (e.g., /login?callbackUrl=/admin/settings)
    loginUrl.searchParams.set('callbackUrl', pathname);
    
    return NextResponse.redirect(loginUrl);
  }

  // SCENARIO 3: All other requests (e.g., logged-out user visiting /about)
  return NextResponse.next();
}

// Configure the matcher to only run on specific paths to save server resources
export const config = {
  matcher: [
    '/admin/:path*', // Matches /admin, /admin/dashboard, /admin/subject, etc.
    '/login'         // Must include /login so we can intercept logged-in users
  ],
};
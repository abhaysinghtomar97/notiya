import { NextResponse } from 'next/server';

export function proxy(request) {
  // 1. Check for your authentication token in the cookies
  const authToken = request.cookies.get('auth_token')?.value;

  // 2. Check if the user is trying to access any route inside /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    
    // 3. If there is no token, redirect them to the public login page
    if (!authToken) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 4. Let the request proceed normally
  return NextResponse.next();
}

// 5. Configure the matcher to optimize performance
export const config = {
  matcher: ['/admin/:path*'],
};
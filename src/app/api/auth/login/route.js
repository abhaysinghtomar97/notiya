// src/app/api/admin/login/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Parse the incoming JSON body
    const body = await request.json();
    const { email, password } = body;

    // Validate inputs
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    // MOCK AUTHENTICATION LOGIC
    // Replace this with real database validation (e.g., matching hashed passwords)
    const MOCK_ADMIN_EMAIL = "admin@psit.ac.in";
    const MOCK_ADMIN_PASSWORD = "password123";

    if (email === MOCK_ADMIN_EMAIL && password === MOCK_ADMIN_PASSWORD) {
      // On success, you would typically generate a JWT token here
      // and set it as an HTTP-only cookie
     const response = NextResponse.json({ message: "Login successful" }, { status: 200 });
  
  // Set the cookie (must match the name you check in middleware)
  response.cookies.set({
    name: 'auth_token',
    value: 'your_generated_jwt_or_session_token_here',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  return response;
}
    // Authentication failed
    return NextResponse.json(
      { error: 'Invalid email or password.' },
      { status: 401 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}


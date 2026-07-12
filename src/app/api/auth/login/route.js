// src/app/api/admin/login/route.js
import { NextResponse } from 'next/server';
import ConnectDb from '@/dbConfig/dbConfig';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    // 1. Establish DB connection inside the handler for Serverless compatibility
    await ConnectDb();
    
    const body = await request.json();
    const { email, password } = body;

    // 2. Validate inputs
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    //  Find user (explicitly selecting the password field if it's hidden by default in the schema)
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // 4. Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // 5. Generate JWT Token Payload
    const tokenPayload = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    // 6. Sign the token (Make sure TOKEN_SECRET exists in your .env file)
    const token = jwt.sign(tokenPayload, process.env.JWT_TOKEN_SECRET, { 
      expiresIn: '7d' // Token expires in 7 days
    });

    // 7. Prepare the successful response
    const response = NextResponse.json(
      { 
        message: 'Login successful',
        user: { id: user._id, email: user.email, role: user.role } 
      },
      { status: 200 }
    );

    // 8. Set the HTTP-Only cookie for middleware authentication
    response.cookies.set('token', token, {
      httpOnly: true, // Prevents JavaScript from reading the cookie (XSS protection)
      secure: process.env.NODE_ENV === 'production', // Only sends over HTTPS in production
      sameSite: 'strict', // CSRF protection
      maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Login Error:', error.message);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
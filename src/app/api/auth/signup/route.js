import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import ConnectDb from '@/dbConfig/dbConfig'; // Assuming you use this based on your login code
import User from '@/models/User';

export async function POST(request) {
  try {
    await ConnectDb();
    const body = await request.json();
    
    // 1. Extract the new adminSecret from the request
    const { name, email, password, adminSecret } = body;

    // 2. CHECK THE SECRET KEY FIRST
    if (adminSecret !== process.env.ADMIN_SIGNUP_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid Registration Key.' },
        { status: 403 } // 403 Forbidden
      );
    }

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'A user with this email already exists.' },
        { status: 409 }
      );
    }

    // Hash password and save
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'ADMIN', 
    });

    return NextResponse.json(
      { message: 'Admin account created successfully' },
      { status: 201 }
    );

  } catch (error) {
    console.error('Signup Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
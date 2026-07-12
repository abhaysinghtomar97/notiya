// src/app/api/auth/signup/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client
// Note: In production, it's better to instantiate this in a separate db.js file to avoid multiple instances during hot-reloading
const prisma = new PrismaClient();

export async function POST(request) {
  try {
    // 1. Parse the request body
    const body = await request.json();
    const { name, email, password } = body;

    // 2. Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    // 3. Check if a user with this email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'A user with this email already exists.' },
        { status: 409 } // 409 Conflict
      );
    }

    // 4. Hash the password
    // 12 rounds of salt is the current industry standard for bcrypt
    const hashedPassword = await bcrypt.hash(password, 12);

    // 5. Create the new user in the database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'ADMIN', // Defaulting to ADMIN based on your specific use case
      },
    });

    // 6. Return success response (DO NOT return the password)
    return NextResponse.json(
      {
        message: 'User created successfully',
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      },
      { status: 201 } // 201 Created
    );

  } catch (error) {
    console.error('Signup Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  } finally {
    // Ensure the database connection is closed
    await prisma.$disconnect();
  }
}
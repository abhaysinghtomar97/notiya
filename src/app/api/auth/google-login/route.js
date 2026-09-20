import { NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import User from '@/models/User';
import ConnectDb from '@/dbConfig/dbConfig'; 
// import { cookies } from 'next/headers'; 

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export async function POST(request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 400 });
    }

    // 1. Verify the Google JWT
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const userEmail = payload.email;
    const userName = payload.name; 
    const userPicture = payload.picture;

    // 2. Connect to MongoDB Atlas
    await ConnectDb();

    // 3. Find the user by email
    let user = await User.findOne({ email: userEmail });
    
    // 4. If the user doesn't exist, create a new standard USER account
    if (!user) {
      // Note: This requires your Mongoose schema to allow a null/empty password,
      // or you will need to generate a secure random password for OAuth users.
      user = await User.create({
        name: userName,
        email: userEmail,
        role: 'USER', 
        
       
      });
    }

    // 5. Return the user data and role to the frontend for dynamic routing
    return NextResponse.json(
      { 
        success: true, 
        message: 'Google authentication successful', 
        user: { 
          id: user._id,
          name: user.name, 
          email: user.email, 
          role: user.role ,
          picture: userPicture
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Google token verification failed:', error);
    return NextResponse.json(
      { error: 'Authentication failed. Invalid token.' },
      { status: 401 }
    );
  }
}
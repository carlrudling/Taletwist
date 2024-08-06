// app/api/users/route.ts

import { NextResponse } from 'next/server'; // Import NextResponse for API routes
import dbConnect from '@/utils/database';
import User from '@/models/user';

// Connect to the database
dbConnect();

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse JSON from the request

    // Create a new user with the request body data
    const user = await User.create(body);

    // Respond with the created user data
    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);

    // Respond with an error message
    return NextResponse.json({ success: false, message: 'Error creating user' }, { status: 400 });
  }
}

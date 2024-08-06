import { NextResponse } from 'next/server';
import dbConnect from '@/utils/database';
import UserMessage from '@/models/userMessage';

// Ensure the database connection is established
dbConnect();

// Function to handle POST requests to create a new user message
export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse JSON from the request

    // Create a new user message using the parsed request body
    const userMessage = await UserMessage.create(body);

    // Respond with the created user message
    return NextResponse.json({ success: true, data: userMessage }, { status: 201 });
  } catch (error) {
    console.error('Error creating user message:', error);
    return NextResponse.json({ success: false, message: 'Error creating user message' }, { status: 400 });
  }
}

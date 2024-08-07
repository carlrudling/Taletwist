import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/database';
import Player from '@/models/player';

// Connect to the database
dbConnect();

// Handle POST request to create a new player
export async function POST(req: NextRequest) {
  try {
    // Parse the JSON body of the request
    const body = await req.json();

    // Create a new player using the request body
    const player = await Player.create(body);

    // Return a success response with the created player
    return NextResponse.json({ success: true, data: player }, { status: 201 });
  } catch (error) {
    console.error('Error creating player:', error);

    // Return an error response if player creation fails
    return NextResponse.json({ success: false, message: 'Error creating player' }, { status: 400 });
  }
}

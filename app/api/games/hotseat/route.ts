// app/api/games/hotseat/route.ts

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/database';
import HotSeat from '@/models/hotSeat';

// Ensure the database is connected
dbConnect();

// Handle POST request to create a new Hot Seat game
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input data
    if (!body.questions || !Array.isArray(body.questions)) {
      return NextResponse.json({ success: false, message: 'Invalid input data' }, { status: 400 });
    }

    // Create a new Hot Seat game
    const hotSeatGame = await HotSeat.create(body);

    return NextResponse.json({ success: true, data: hotSeatGame }, { status: 201 });
  } catch (error) {
    console.error('Error creating Hot Seat game:', error);
    return NextResponse.json({ success: false, message: 'Error creating Hot Seat game' }, { status: 500 });
  }
}

// Handle GET request to fetch all Hot Seat games
export async function GET() {
  try {
    const games = await HotSeat.find();

    return NextResponse.json({ success: true, data: games }, { status: 200 });
  } catch (error) {
    console.error('Error fetching Hot Seat games:', error);
    return NextResponse.json({ success: false, message: 'Error fetching Hot Seat games' }, { status: 500 });
  }
}

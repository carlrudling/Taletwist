// app/api/games/guesswho/route.ts

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/database';
import GuessWho from '@/models/guessWho';

// Ensure the database is connected
dbConnect();

// Handle POST request to create a new Guess Who game
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input data
    if (!body.statements || !Array.isArray(body.statements)) {
      return NextResponse.json({ success: false, message: 'Invalid input data' }, { status: 400 });
    }

    // Create a new Guess Who game
    const guessWhoGame = await GuessWho.create(body);

    return NextResponse.json({ success: true, data: guessWhoGame }, { status: 201 });
  } catch (error) {
    console.error('Error creating Guess Who game:', error);
    return NextResponse.json({ success: false, message: 'Error creating Guess Who game' }, { status: 500 });
  }
}

// Handle GET request to fetch all Guess Who games
export async function GET() {
  try {
    const games = await GuessWho.find();

    return NextResponse.json({ success: true, data: games }, { status: 200 });
  } catch (error) {
    console.error('Error fetching Guess Who games:', error);
    return NextResponse.json({ success: false, message: 'Error fetching Guess Who games' }, { status: 500 });
  }
}

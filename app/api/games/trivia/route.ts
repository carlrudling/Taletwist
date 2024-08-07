// app/api/games/trivia/route.ts

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/database';
import Trivia from '@/models/trivia';

// Ensure the database is connected
dbConnect();

// Handle POST request to create a new Trivia game
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input data
    if (!body.questions || !Array.isArray(body.questions)) {
      return NextResponse.json({ success: false, message: 'Invalid input data' }, { status: 400 });
    }

    // Create a new Trivia game
    const triviaGame = await Trivia.create(body);

    return NextResponse.json({ success: true, data: triviaGame }, { status: 201 });
  } catch (error) {
    console.error('Error creating Trivia game:', error);
    return NextResponse.json({ success: false, message: 'Error creating Trivia game' }, { status: 500 });
  }
}

// Handle GET request to fetch all Trivia games
export async function GET() {
  try {
    const games = await Trivia.find();

    return NextResponse.json({ success: true, data: games }, { status: 200 });
  } catch (error) {
    console.error('Error fetching Trivia games:', error);
    return NextResponse.json({ success: false, message: 'Error fetching Trivia games' }, { status: 500 });
  }
}

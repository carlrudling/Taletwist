// app/api/games/mostlikely/route.ts

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/database';
import MostLikely from '@/models/mostLikely';

// Ensure the database is connected
dbConnect();

// Handle POST request to create a new Most Likely game
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input data
    if (!body.questions || !Array.isArray(body.questions)) {
      return NextResponse.json({ success: false, message: 'Invalid input data' }, { status: 400 });
    }

    // Create a new Most Likely game
    const mostLikelyGame = await MostLikely.create(body);

    return NextResponse.json({ success: true, data: mostLikelyGame }, { status: 201 });
  } catch (error) {
    console.error('Error creating Most Likely game:', error);
    return NextResponse.json({ success: false, message: 'Error creating Most Likely game' }, { status: 500 });
  }
}

// Handle GET request to fetch all Most Likely games
export async function GET() {
  try {
    const games = await MostLikely.find();

    return NextResponse.json({ success: true, data: games }, { status: 200 });
  } catch (error) {
    console.error('Error fetching Most Likely games:', error);
    return NextResponse.json({ success: false, message: 'Error fetching Most Likely games' }, { status: 500 });
  }
}

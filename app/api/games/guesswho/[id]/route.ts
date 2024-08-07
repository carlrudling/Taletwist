// app/api/games/guesswho/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/database';
import GuessWho from '@/models/guessWho';

// Ensure the database is connected
dbConnect();

// Handle GET request to fetch a specific Guess Who game by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const game = await GuessWho.findById(id);

    if (!game) {
      return NextResponse.json({ success: false, message: 'Game not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: game }, { status: 200 });
  } catch (error) {
    console.error('Error fetching Guess Who game:', error);
    return NextResponse.json({ success: false, message: 'Error fetching Guess Who game' }, { status: 500 });
  }
}

// Handle PUT request to update a specific Guess Who game by ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();

    // Validate input data
    if (!body.statements || !Array.isArray(body.statements)) {
      return NextResponse.json({ success: false, message: 'Invalid input data' }, { status: 400 });
    }

    const game = await GuessWho.findByIdAndUpdate(id, body, { new: true, runValidators: true });

    if (!game) {
      return NextResponse.json({ success: false, message: 'Game not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: game }, { status: 200 });
  } catch (error) {
    console.error('Error updating Guess Who game:', error);
    return NextResponse.json({ success: false, message: 'Error updating Guess Who game' }, { status: 500 });
  }
}

// Handle DELETE request to remove a specific Guess Who game by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const game = await GuessWho.findByIdAndDelete(id);

    if (!game) {
      return NextResponse.json({ success: false, message: 'Game not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Game deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting Guess Who game:', error);
    return NextResponse.json({ success: false, message: 'Error deleting Guess Who game' }, { status: 500 });
  }
}

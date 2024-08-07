// app/api/games/trivia/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/database';
import Trivia from '@/models/trivia';

// Ensure the database is connected
dbConnect();

// Handle GET request to fetch a specific Trivia game by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const game = await Trivia.findById(id);

    if (!game) {
      return NextResponse.json({ success: false, message: 'Game not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: game }, { status: 200 });
  } catch (error) {
    console.error('Error fetching Trivia game:', error);
    return NextResponse.json({ success: false, message: 'Error fetching Trivia game' }, { status: 500 });
  }
}

// Handle PUT request to update a specific Trivia game by ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();

    // Validate input data
    if (!body.questions || !Array.isArray(body.questions)) {
      return NextResponse.json({ success: false, message: 'Invalid input data' }, { status: 400 });
    }

    const game = await Trivia.findByIdAndUpdate(id, body, { new: true, runValidators: true });

    if (!game) {
      return NextResponse.json({ success: false, message: 'Game not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: game }, { status: 200 });
  } catch (error) {
    console.error('Error updating Trivia game:', error);
    return NextResponse.json({ success: false, message: 'Error updating Trivia game' }, { status: 500 });
  }
}

// Handle DELETE request to remove a specific Trivia game by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const game = await Trivia.findByIdAndDelete(id);

    if (!game) {
      return NextResponse.json({ success: false, message: 'Game not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Game deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting Trivia game:', error);
    return NextResponse.json({ success: false, message: 'Error deleting Trivia game' }, { status: 500 });
  }
}

// app/api/games/mostlikely/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/database';
import MostLikely from '@/models/mostLikely';

// Ensure the database is connected
dbConnect();

// Handle GET request to fetch a specific Most Likely game by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const game = await MostLikely.findById(id);

    if (!game) {
      return NextResponse.json({ success: false, message: 'Game not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: game }, { status: 200 });
  } catch (error) {
    console.error('Error fetching Most Likely game:', error);
    return NextResponse.json({ success: false, message: 'Error fetching Most Likely game' }, { status: 500 });
  }
}

// Handle PUT request to update a specific Most Likely game by ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();

    // Validate input data
    if (!body.questions || !Array.isArray(body.questions)) {
      return NextResponse.json({ success: false, message: 'Invalid input data' }, { status: 400 });
    }

    const game = await MostLikely.findByIdAndUpdate(id, body, { new: true, runValidators: true });

    if (!game) {
      return NextResponse.json({ success: false, message: 'Game not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: game }, { status: 200 });
  } catch (error) {
    console.error('Error updating Most Likely game:', error);
    return NextResponse.json({ success: false, message: 'Error updating Most Likely game' }, { status: 500 });
  }
}

// Handle DELETE request to remove a specific Most Likely game by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const game = await MostLikely.findByIdAndDelete(id);

    if (!game) {
      return NextResponse.json({ success: false, message: 'Game not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Game deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting Most Likely game:', error);
    return NextResponse.json({ success: false, message: 'Error deleting Most Likely game' }, { status: 500 });
  }
}

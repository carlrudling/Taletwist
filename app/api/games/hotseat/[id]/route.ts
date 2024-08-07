// app/api/games/hotseat/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/database';
import HotSeat from '@/models/hotSeat';

// Ensure the database is connected
dbConnect();

// Handle GET request to fetch a specific Hot Seat game by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const game = await HotSeat.findById(id);

    if (!game) {
      return NextResponse.json({ success: false, message: 'Game not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: game }, { status: 200 });
  } catch (error) {
    console.error('Error fetching Hot Seat game:', error);
    return NextResponse.json({ success: false, message: 'Error fetching Hot Seat game' }, { status: 500 });
  }
}

// Handle PUT request to update a specific Hot Seat game by ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();

    // Validate input data
    if (!body.questions || !Array.isArray(body.questions)) {
      return NextResponse.json({ success: false, message: 'Invalid input data' }, { status: 400 });
    }

    const game = await HotSeat.findByIdAndUpdate(id, body, { new: true, runValidators: true });

    if (!game) {
      return NextResponse.json({ success: false, message: 'Game not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: game }, { status: 200 });
  } catch (error) {
    console.error('Error updating Hot Seat game:', error);
    return NextResponse.json({ success: false, message: 'Error updating Hot Seat game' }, { status: 500 });
  }
}

// Handle DELETE request to remove a specific Hot Seat game by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const game = await HotSeat.findByIdAndDelete(id);

    if (!game) {
      return NextResponse.json({ success: false, message: 'Game not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Game deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting Hot Seat game:', error);
    return NextResponse.json({ success: false, message: 'Error deleting Hot Seat game' }, { status: 500 });
  }
}

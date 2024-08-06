import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/database';
import Player from '@/models/player';

// Connect to the database once
dbConnect();

// Handle GET request to fetch a player by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params; // Extract the player ID from params

  try {
    // Find the player by ID
    const player = await Player.findById(id);

    // Check if player exists
    if (!player) {
      return NextResponse.json({ success: false, message: 'Player not found' }, { status: 404 });
    }

    // Respond with the player data
    return NextResponse.json({ success: true, data: player }, { status: 200 });
  } catch (error) {
    console.error('Error fetching player:', error);
    return NextResponse.json({ success: false, message: 'Error fetching player' }, { status: 400 });
  }
}

// Handle PUT request to update a player by ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params; // Extract the player ID from params

  try {
    // Parse the request body
    const body = await req.json();

    // Find and update the player by ID
    const player = await Player.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    // Check if player exists
    if (!player) {
      return NextResponse.json({ success: false, message: 'Player not found' }, { status: 404 });
    }

    // Respond with the updated player data
    return NextResponse.json({ success: true, data: player }, { status: 200 });
  } catch (error) {
    console.error('Error updating player:', error);
    return NextResponse.json({ success: false, message: 'Error updating player' }, { status: 400 });
  }
}

// Handle DELETE request to remove a player by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params; // Extract the player ID from params

  try {
    // Delete the player by ID
    const deletedPlayer = await Player.deleteOne({ _id: id });

    // Check if player was deleted
    if (deletedPlayer.deletedCount === 0) {
      return NextResponse.json({ success: false, message: 'Player not found' }, { status: 404 });
    }

    // Respond with a success message
    return NextResponse.json({ success: true, message: 'Player deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting player:', error);
    return NextResponse.json({ success: false, message: 'Error deleting player' }, { status: 400 });
  }
}

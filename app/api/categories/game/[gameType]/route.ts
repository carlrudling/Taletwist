// app/api/categories/games/[gameType]/route.ts

import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import dbConnect from '@/utils/database';
import Category from '@/models/category';

// Connect to the database
dbConnect();

// Function to handle GET requests for categories by gameType
export async function GET(req: NextRequest, { params }: { params: { gameType: string } }) {
  const { gameType } = params; // Access the gameType from params
  console.log('Received gameType:', gameType); // Debug: Log received gameType

  try {
    // Find categories where the gameType matches the given gameType
    const categories = await Category.find({ 'gameType.name': gameType });

    // Respond with the found categories
    return NextResponse.json({ success: true, data: categories }, { status: 200 });
  } catch (error) {
    console.error('Error fetching categories by gameType:', error);
    return NextResponse.json({ success: false, message: 'Error fetching categories' }, { status: 400 });
  }
}

// app/api/categories/[creatorId]/route.ts

import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import dbConnect from '@/utils/database';
import Category from '@/models/category';

// Ensure that the database is connected
dbConnect();

// Function to handle GET requests for categories by creatorId
export async function GET(req: NextRequest, { params }: { params: { creatorId: string } }) {
  const { creatorId } = params; // Access the creatorId from params

  try {
    // Find categories where the creatorId matches the given id
    const categories = await Category.find({ creatorId });

    // Respond with the found categories
    return NextResponse.json({ success: true, data: categories }, { status: 200 });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ success: false, message: 'Error fetching categories' }, { status: 400 });
  }
}

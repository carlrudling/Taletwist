// app/api/categories/route.ts

import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import dbConnect from '@/utils/database';
import Category from '@/models/category';

// Connect to the database
dbConnect();

export async function POST(req: NextRequest) {
  try {
    // Parse the JSON body from the request
    const body = await req.json();

    console.log('Received Data:', body); // Verify questionCount is received

    // Validate questionCount if necessary
    if (typeof body.questionCount !== 'number' || body.questionCount < 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid question count' },
        { status: 400 }
      );
    }

    // Create a new category with the parsed body data
    const category = await Category.create(body);

    // Return a successful response with the created category data
    return NextResponse.json({ success: true, data: category }, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);

    // Return an error response with a status code 400
    return NextResponse.json(
      { success: false, message: 'Error creating category' },
      { status: 400 }
    );
  }
}

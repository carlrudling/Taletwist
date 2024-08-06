// app/api/user/[id]/route.ts

import { NextResponse } from 'next/server';
import dbConnect from '@/utils/database';
import User from '@/models/user';

// Ensure the database is connected
dbConnect();

// Handle GET request for fetching a specific user
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ success: false, message: 'Error fetching user' }, { status: 400 });
  }
}

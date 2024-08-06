// app/api/quizzes/[creatorId]/route.ts

import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import dbConnect from '@/utils/database';
import Quiz from '@/models/quiz';

// Connect to the database
dbConnect();

export async function GET(req: NextRequest, { params }: { params: { creatorId: string } }) {
  const { creatorId } = params;

  try {
    // Fetch all quizzes associated with the given creatorId
    const quizzes = await Quiz.find({ creatorId });

    // Check if quizzes are found
    if (!quizzes || quizzes.length === 0) {
      return NextResponse.json({ success: false, message: 'No quizzes found for this creator' }, { status: 404 });
    }

    // Return the quizzes in the response
    return NextResponse.json({ success: true, data: quizzes }, { status: 200 });
  } catch (error) {
    console.error('Error fetching quizzes:', error);

    // Return an error response with a status code 500
    return NextResponse.json({ success: false, message: 'Error fetching quizzes' }, { status: 500 });
  }
}

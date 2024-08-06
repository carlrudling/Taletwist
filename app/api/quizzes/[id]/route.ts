// app/api/quizzes/[id]/route.ts

import { NextResponse } from 'next/server';
import dbConnect from '@/utils/database';
import Quiz from '@/models/quiz';

dbConnect(); // Ensure the database is connected

// Handle GET request for fetching a specific quiz
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const quiz = await Quiz.findById(id);

    if (!quiz) {
      return NextResponse.json({ success: false, message: 'Quiz not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: quiz }, { status: 200 });
  } catch (error) {
    console.error('Error fetching quiz:', error);
    return NextResponse.json({ success: false, message: 'Error fetching quiz' }, { status: 400 });
  }
}

// Handle PUT request for updating a specific quiz
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const data = await request.json();

  try {
    const quiz = await Quiz.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!quiz) {
      return NextResponse.json({ success: false, message: 'Quiz not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: quiz }, { status: 200 });
  } catch (error) {
    console.error('Error updating quiz:', error);
    return NextResponse.json({ success: false, message: 'Error updating quiz' }, { status: 400 });
  }
}

// Handle DELETE request for deleting a specific quiz
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(id);

    if (!deletedQuiz) {
      return NextResponse.json({ success: false, message: 'Quiz not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Quiz deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting quiz:', error);
    return NextResponse.json({ success: false, message: 'Error deleting quiz' }, { status: 400 });
  }
}

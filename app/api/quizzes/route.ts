// app/api/quizzes/route.ts

import { NextResponse } from 'next/server'; // Use NextResponse for API routes in the app directory
import dbConnect from '@/utils/database';
import Quiz from '@/models/quiz';
import { generateJoinCode } from '@/utils/generateJoinCode';

// Connect to the database
dbConnect();

// Handle POST request to create a new quiz
export async function POST(req: Request) {
  console.log('Handling POST request');

  try {
    const body = await req.json(); // Parse JSON from the request

    // Ensure the required fields are present
    if (!body.creatorId || !body.name) {
      return NextResponse.json(
        { success: false, message: 'Creator ID and quiz name are required' },
        { status: 400 }
      );
    }

    // Attempt to create a quiz with a unique join code
    let quiz;
    let joinCode;
    let isUnique = false;

    // Retry loop to ensure the join code is unique
    while (!isUnique) {
      joinCode = generateJoinCode();
      try {
        // Attempt to create the quiz
        quiz = await Quiz.create({
          ...body,
          joinCode: joinCode,
        });

        // If successful, exit the loop
        isUnique = true;
      } catch (error: any) {
        // If a duplicate key error occurs, try again
        if (error.code === 11000 && error.keyPattern?.joinCode) {
          console.log('Duplicate join code, retrying...');
        } else {
          console.error('Error creating quiz:', error);
          return NextResponse.json(
            { success: false, message: 'Error creating quiz' },
            { status: 400 }
          );
        }
      }
    }

    // If successful, return the created quiz
    return NextResponse.json({ success: true, data: quiz }, { status: 201 });
  } catch (error) {
    console.error('Error creating quiz:', error);
    return NextResponse.json(
      { success: false, message: 'Error creating quiz' },
      { status: 500 }
    );
  }
}

// Handle DELETE request to delete expired quizzes
export async function DELETE(req: Request) {
  console.log('Handling DELETE request');

  try {
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() - 5);

    const result = await Quiz.deleteMany({ createdAt: { $lte: expirationTime } });

    return NextResponse.json(
      { success: true, message: `Deleted ${result.deletedCount} expired quizzes` },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting expired quizzes:', error);
    return NextResponse.json(
      { success: false, message: 'Error deleting expired quizzes' },
      { status: 500 }
    );
  }
}

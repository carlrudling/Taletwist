// app/api/quizzes/joinCode/[joinCode]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/database';
import Quiz, { IQuiz, IPlayer } from '@/models/quiz';

// Ensure the database is connected
dbConnect();

// Define the POST handler for adding a player to a quiz by joinCode
export async function POST(req: NextRequest, { params }: { params: { joinCode: string } }) {
  try {
    // Parse the request body to get the player details
    const { name, score = 0, wins = 0 } = await req.json();

    // Validate player name
    if (!name) {
      return NextResponse.json({ success: false, message: 'Player name is required' }, { status: 400 });
    }

    // Find the quiz by joinCode
    const { joinCode } = params;
    const quiz = await Quiz.findOne({ joinCode });

    if (!quiz) {
      return NextResponse.json({ success: false, message: 'Quiz not found' }, { status: 404 });
    }

    // Check if the player name already exists in the quiz
    const existingPlayer = quiz.players.find((player: IPlayer) => player.name === name);
    if (existingPlayer) {
      return NextResponse.json({ success: false, message: 'Player name already exists in the quiz' }, { status: 400 });
    }

    // Create a new player object
    const newPlayer: IPlayer = { name, score, wins };

    // Add the player to the quiz's players array
    quiz.players.push(newPlayer);

    // Save the updated quiz document
    await quiz.save();

    // Return a success response
    return NextResponse.json({ success: true, data: quiz }, { status: 200 });
  } catch (error) {
    console.error('Error adding player to quiz:', error);
    return NextResponse.json({ success: false, message: 'Error adding player to quiz' }, { status: 500 });
  }
}

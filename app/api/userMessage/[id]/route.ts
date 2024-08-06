import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import dbConnect from '@/utils/database';
import UserMessage from '@/models/userMessage';

// Ensure the database connection is established
dbConnect();

// Function to handle GET requests for a specific user message
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params; // Access the id from the params

  try {
    // Find the user message by its ID
    const userMessage = await UserMessage.findById(id);
    if (!userMessage) {
      return NextResponse.json({ success: false, message: 'User message not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: userMessage }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user message:', error);
    return NextResponse.json({ success: false, message: 'Error fetching user message' }, { status: 400 });
  }
}

// Function to handle PUT requests to update a specific user message
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params; // Access the id from the params
  const body = await req.json(); // Parse the request body as JSON

  try {
    // Update the user message with the new data
    const userMessage = await UserMessage.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!userMessage) {
      return NextResponse.json({ success: false, message: 'User message not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: userMessage }, { status: 200 });
  } catch (error) {
    console.error('Error updating user message:', error);
    return NextResponse.json({ success: false, message: 'Error updating user message' }, { status: 400 });
  }
}

// Function to handle DELETE requests to remove a specific user message
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params; // Access the id from the params

  try {
    // Delete the user message by its ID
    const deletedUserMessage = await UserMessage.deleteOne({ _id: id });
    if (deletedUserMessage.deletedCount === 0) { // Check if a document was deleted
      return NextResponse.json({ success: false, message: 'User message not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'User message deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting user message:', error);
    return NextResponse.json({ success: false, message: 'Error deleting user message' }, { status: 400 });
  }
}

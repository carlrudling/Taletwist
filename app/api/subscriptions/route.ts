import { NextResponse } from 'next/server';
import dbConnect from '@/utils/database';
import Subscription from '@/models/subscription';

// Ensure the database is connected
dbConnect();

// Handle the POST request to create a new subscription
export async function POST(req: Request) {
  try {
    // Parse JSON body from the request
    const body = await req.json();

    // Create a new subscription using the parsed data
    const subscription = await Subscription.create(body);

    // Respond with the created subscription and a 201 status code
    return NextResponse.json({ success: true, data: subscription }, { status: 201 });
  } catch (error) {
    console.error('Error creating subscription:', error);
    // Respond with an error message and a 400 status code in case of failure
    return NextResponse.json({ success: false, message: 'Error creating subscription' }, { status: 400 });
  }
}

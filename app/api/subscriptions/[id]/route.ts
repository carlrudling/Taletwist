import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/utils/database';
import Subscription from '@/models/subscription';

// Connect to the database
dbConnect();

// Function to handle GET requests to fetch a subscription by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params; // Access the id from params

  try {
    const subscription = await Subscription.findById(id);
    if (!subscription) {
      return NextResponse.json({ success: false, message: 'Subscription not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: subscription }, { status: 200 });
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return NextResponse.json({ success: false, message: 'Error fetching subscription' }, { status: 400 });
  }
}

// Function to handle PUT requests to update a subscription by ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params; // Access the id from params
  const body = await req.json();

  try {
    const subscription = await Subscription.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!subscription) {
      return NextResponse.json({ success: false, message: 'Subscription not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: subscription }, { status: 200 });
  } catch (error) {
    console.error('Error updating subscription:', error);
    return NextResponse.json({ success: false, message: 'Error updating subscription' }, { status: 400 });
  }
}

// Function to handle DELETE requests to delete a subscription by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params; // Access the id from params

  try {
    const deletedSubscription = await Subscription.deleteOne({ _id: id });
    if (deletedSubscription.deletedCount === 0) {
      return NextResponse.json({ success: false, message: 'Subscription not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Subscription deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting subscription:', error);
    return NextResponse.json({ success: false, message: 'Error deleting subscription' }, { status: 400 });
  }
}

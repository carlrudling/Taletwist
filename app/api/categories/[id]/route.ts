// app/api/categories/[id]/route.ts

import { NextResponse } from 'next/server'; // Use NextResponse for API routes in the app directory
import { NextRequest } from 'next/server';
import dbConnect from '@/utils/database';
import Category from '@/models/category';

// Ensure that the database is connected
dbConnect();

// Function to handle GET requests
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params; // Access the id from params instead of req.query

  try {
    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json({ success: false, message: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: category }, { status: 200 });
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json({ success: false, message: 'Error fetching category' }, { status: 400 });
  }
}

// Function to handle PUT requests
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params; // Access the id from params instead of req.query
  const body = await req.json();

  try {
    const category = await Category.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!category) {
      return NextResponse.json({ success: false, message: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: category }, { status: 200 });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json({ success: false, message: 'Error updating category' }, { status: 400 });
  }
}

// Function to handle DELETE requests
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params; // Access the id from params instead of req.query

  try {
    const deletedCategory = await Category.deleteOne({ _id: id });
    if (deletedCategory.deletedCount === 0) { // Check if a document was deleted
      return NextResponse.json({ success: false, message: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Category deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json({ success: false, message: 'Error deleting category' }, { status: 400 });
  }
}

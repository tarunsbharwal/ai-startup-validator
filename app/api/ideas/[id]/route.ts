import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Idea from '@/models/Idea';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    
    const { id } = await params;
    
    // Fetch from DB using the unwrapped ID
    const idea = await Idea.findById(id);
    
    if (!idea) return NextResponse.json({ success: false }, { status: 404 });
    return NextResponse.json({ success: true, data: idea }, { status: 200 });
    
  } catch { 
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    
    // Unwrap the params Promise here too
    const { id } = await params;
    
    const deletedIdea = await Idea.deleteOne({ _id: id });
    if (!deletedIdea) return NextResponse.json({ success: false }, { status: 400 });
    return NextResponse.json({ success: true, data: {} }, { status: 200 });
    
  } catch {
    // Fix 6: Removed the '(error)' completely
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
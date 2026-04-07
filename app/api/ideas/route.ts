import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Idea from '@/models/Idea';
import OpenAI from 'openai';

// Initialize the SDK pointing to Groq's servers
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1" 
});

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { title, description } = await req.json();

    const promptText = `You are an expert startup consultant. Analyze the given startup idea and return a structured JSON object with the exact following fields: "problem", "customer", "market", "competitor", "tech_stack", "risk_level", "profitability_score", "justification".
    
    Rules:
    - Keep answers concise and realistic.
    - 'problem', 'customer', 'market', and 'justification' MUST be plain text strings (1-2 sentences), NOT nested objects.
    - 'competitor' must be an array of exactly 3 strings, each containing a competitor name and a one-line differentiation.
    - 'tech_stack' must be an array of 4-6 practical technologies for an MVP.
    - 'profitability_score' must be an integer between 0 and 100.
    - 'risk_level' must be "Low", "Medium", or "High".
    - Return ONLY valid JSON.
    
    Input: Title: "${title}", Description: "${description}"`;

    // Call Groq's insanely fast Llama 3 model
    const completion = await groq.chat.completions.create({
      messages: [{ role: "system", content: promptText }],
      model: "llama-3.1-8b-instant", 
      response_format: { type: "json_object" },
    });

    const aiReport = JSON.parse(completion.choices[0].message?.content || "{}");

    const newIdea = await Idea.create({
      title,
      description,
      ...aiReport
    });

    return NextResponse.json({ success: true, data: newIdea }, { status: 201 });
  } catch (error) { 
    console.error("API Error:", error);
   
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const ideas = await Idea.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: ideas }, { status: 200 });
  } catch { 
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
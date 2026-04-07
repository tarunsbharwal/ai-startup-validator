# AI Startup Validator

This is a Next.js App Router MVP that validates startup ideas using OpenAI and stores reports in MongoDB.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the project root and add your secrets:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
OPENAI_API_KEY=your_openai_api_key
```

3. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

- `app/page.tsx` — idea submission form
- `app/dashboard/page.tsx` — dashboard with saved ideas
- `app/dashboard/[id]/page.tsx` — detailed AI report page
- `app/api/ideas/route.ts` — create and list ideas
- `app/api/ideas/[id]/route.ts` — fetch and delete individual ideas
- `lib/mongodb.ts` — MongoDB connection helper
- `models/Idea.ts` — Mongoose schema for ideas

## Prompt Template

The backend uses this prompt to generate the AI report:

```text
You are an expert startup consultant. Analyze the given startup idea and return a structured JSON object with the fields: problem, customer, market, competitor, tech_stack, risk_level, profitability_score, justification. Rules: Keep answers concise and realistic. 'competitor' should contain exactly 3 competitors with one-line differentiation each. 'tech_stack' should be 4-6 practical technologies for MVP. 'profitability_score' must be an integer between 0-100. Return ONLY JSON. Input: { "title": "${title}", "description": "${description}" }
```

## Deployment

- Push the code to GitHub.
- Import the repo into Vercel.
- Add `MONGODB_URI` and `OPENAI_API_KEY` in Vercel Environment Variables.
- Deploy using Vercel's automatic Next.js build.
# ai-startup-validator

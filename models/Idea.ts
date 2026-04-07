import mongoose, { Document, Model, Schema } from "mongoose";

export interface IdeaDocument extends Document {
  title: string;
  description: string;
  problem?: string;
  customer?: string;
  market?: string;
  competitor?: string[];
  tech_stack?: string[];
  risk_level?: string;
  profitability_score?: number;
  justification?: string;
  createdAt: Date;
}

const IdeaSchema = new Schema<IdeaDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    problem: { type: String },
    customer: { type: String },
    market: { type: String },
    competitor: { type: [String], default: [] },
    tech_stack: { type: [String], default: [] },
    risk_level: { type: String },
    profitability_score: { type: Number },
    justification: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const Idea = (mongoose.models.Idea as Model<IdeaDocument>) || mongoose.model<IdeaDocument>("Idea", IdeaSchema);

export default Idea;

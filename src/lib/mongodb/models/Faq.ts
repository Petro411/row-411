// models/Faq.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IFaq extends Document {
  title: string;
  description: string; 
}

const FaqSchema = new Schema<IFaq>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Faq || mongoose.model<IFaq>('Faq', FaqSchema);

// models/Newsletter.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface INewsletter extends Document {
  name: string;
  email: string;
}

const NewsletterSchema = new Schema<INewsletter>(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.models.Newsletter || mongoose.model<INewsletter>('Newsletter', NewsletterSchema);

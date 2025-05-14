// models/Page.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IPage extends Document {
  slug: string; // e.g., 'privacy-policy', 'terms-of-service'
  title: string;
  content: string; // HTML or JSON string from a rich text editor
  updatedAt: Date;
}

const PageSchema = new Schema<IPage>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Page || mongoose.model<IPage>('Page', PageSchema);

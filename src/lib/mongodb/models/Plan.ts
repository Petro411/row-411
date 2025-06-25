import mongoose, { Schema, Document } from 'mongoose';

export interface IPlan extends Document {
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    priceId: string;
    amount: number
}

const PlanSchema: Schema = new Schema<IPlan>(
    {
        title: { type: String, required: true },
        subtitle: { type: String, required: true },
        description: { type: String, required: true },
        features: { type: [String], default: [] },
        priceId: { type: String, required: true, unique: true },
        amount: { type: Number, required: true }
    },
    { timestamps: true }
);

export default mongoose.models.Plan || mongoose.model<IPlan>('Plan', PlanSchema);
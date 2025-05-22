import { Document, Schema, model, models } from 'mongoose';

export interface ILocation extends Document {
  name: string;
  code: string;
  type: 'country' | 'state';
}

const LocationSchema = new Schema<ILocation>({
  name: { type: String, required: true },
  code: { type: String, required: true },
  type: { type: String, enum: ['country', 'state'], required: true }
});

export default models.Location || model<ILocation>('Location', LocationSchema);

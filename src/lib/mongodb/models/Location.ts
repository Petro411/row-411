import { Document, Schema, model, models } from 'mongoose';

export interface ILocation extends Document {
  name: string;
  code: string;
  type: 'county' | 'state';
  stateCode: string | null
}

const LocationSchema = new Schema<ILocation>({
  name: { type: String, required: true },
  code: { type: String, required: true },
  type: { type: String, enum: ['county', 'state'], required: true },
  stateCode: { type: String }
});

export default models.Location || model<ILocation>('Location', LocationSchema);

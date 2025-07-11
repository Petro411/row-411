import { Schema, Document, model, models } from 'mongoose';


interface State {
    name: string;
    code: string;
}

export interface IMineralOwner extends Document {
    name: string;
    emails: string[];
    numbers: string[];
    addresses: string[];
    counties: string[];
    zipcode: string;
    description: string;
    state: State;
    city: string;
}

const StateSchema: Schema<State> = new Schema({
    name: { type: String },
    code: { type: String },
}, { _id: false });

const MineralOwnerSchema = new Schema<IMineralOwner>({
    name: { type: String, required: true },
    emails: [{ type: String, }],
    numbers: [{ type: String, }],
    addresses: [{ type: String }],
    counties: [{ type: String }],
    zipcode: { type: String, },
    description: { type: String, },
    city: { type: String, },
    state: { type: StateSchema }
}, {
    timestamps: true
});

const MineralOwner = models.MineralOwner || model<IMineralOwner>('MineralOwner', MineralOwnerSchema);

export default MineralOwner;

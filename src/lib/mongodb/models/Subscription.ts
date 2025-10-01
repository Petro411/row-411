import mongoose, { Schema } from 'mongoose';

import { IUserSubscription, UserPlanStatus } from '../../../../types/subscription';


const SubscriptionSchema = new mongoose.Schema<IUserSubscription>({
    subscriptionId: { type: String, required: true },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    priceId: { type: String, required: true },

    status: {
        type: String,
        enum: Object.values(UserPlanStatus),
        required: true,
    },
    currency: { type: String, default: null },

    interval: { type: String, default: null },
    intervalCount: { type: Number, default: null },

    start_date: { type: Number, required: true },
    cancel_at: { type: Number, default: null },
    canceled_at: { type: Number, default: null },
    ended_at: { type: Number, default: null },
    expires_at: { type: Number, required: true },
    amount: { type: Number, default: null },

    monthlyDownloadLimit: { type: Number, required: true },
    totalDownloads: { type: Number, default: 0 },
    downloadsThisMonth: { type: Number, default: 0 },
    downloads_list:[{
        county:{type:String},
        items_count:{type:Number}
    }]
}, { timestamps: true });

export default mongoose.models.Subscription || mongoose.model<IUserSubscription>('Subscription', SubscriptionSchema);

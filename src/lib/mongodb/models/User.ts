import mongoose from "mongoose";
import { Permission } from "../../../../types/permissions";

const userSchema = new mongoose.Schema(
    {
        picture: {
            type: String
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
        },
        bio: {
            type: String,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        isSuspended: {
            type: Boolean,
            default: false,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        isOnboarded: {
            type: Boolean,
            default: false,
        },
        permissions: {
            type: [String],
            enum: Object.values(Permission),
            default: [],
        },
        customer_id: { type: String },
        subscription: {
            id: String,
            priceId: String,
            status: {
                type: String,
                enum: ["awaitingPayment", "paid"],
                default: "awaitingPayment"
            },
            currency: String,
            interval: String,
            intervalCount: Number,
            createdAt: Date,
            start_date: Date,
            cancel_at: Date,
            canceled_at: Date,
            ended_at: Date,
            expires_at: Date,
            amount:Number
        }
    },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);

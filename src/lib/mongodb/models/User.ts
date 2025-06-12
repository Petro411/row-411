import mongoose, { Schema } from "mongoose";
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
            type: Schema.Types.ObjectId,
            ref: 'Subscription',
        }
    },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);

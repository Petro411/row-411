import mongoose from "mongoose";

export enum UserPlanStatus {
  AwaitingPayment = 'awaitingPayment',
  Paid = 'paid',
}

export interface IUserSubscription extends Document {
  subscriptionId: string;
  userId: mongoose.Types.ObjectId;
  priceId: string;

  status: UserPlanStatus;
  currency: string | null;

  interval: string | null;
  intervalCount: number | null;

  start_date: Number | null;
  cancel_at: Number | null;
  canceled_at: Number | null;
  ended_at: Number | null;
  expires_at: Number | null;
  amount: number | null;

  // Custom fields for download limits
  monthlyDownloadLimit: number;
  totalDownloads: number;
  downloadsThisMonth: number;
}
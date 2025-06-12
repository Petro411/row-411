import type { Stripe } from 'stripe';
import { UserPlanStatus } from '../../../types/subscription';
import mongoose from 'mongoose';

export function buildOrganizationSubscription(
  subscription: Stripe.Subscription & { userId: string,monthlyDownloadLimit:string },
  status: UserPlanStatus = UserPlanStatus.Paid
): any {
  const lineItem = subscription.items.data[0];
  const price = lineItem.price;

  const interval = price?.recurring?.interval ?? null;
  const intervalCount = price?.recurring?.interval_count ?? 1;

  const createdAt = subscription.created * 1000;
  const expiresAt = calculateExpirationDate(createdAt, interval, intervalCount);

  return {
    subscriptionId: subscription.id,
    userId: new mongoose.Types.ObjectId(subscription.userId),
    priceId: price?.id,
    status,
    currency: price?.currency ?? null,
    interval,
    intervalCount,
    start_date: subscription.start_date * 1000,
    ended_at: subscription.ended_at ? subscription.ended_at * 1000 : null,
    cancel_at: subscription?.cancel_at ? subscription.cancel_at * 1000 : null,
    canceled_at: subscription.canceled_at ? subscription.canceled_at * 1000 : null,
    expires_at: expiresAt,
    amount: price.unit_amount,
    monthlyDownloadLimit: Number(subscription.monthlyDownloadLimit),
    totalDownloads: 0,
    downloadsThisMonth: 0
  };
}

function calculateExpirationDate(
  createdAt: number,
  interval: string | null,
  intervalCount: number
): any {
  const date = new Date(createdAt);

  switch (interval) {
    case 'day':
      date.setDate(date.getDate() + intervalCount);
      break;
    case 'week':
      date.setDate(date.getDate() + intervalCount * 7);
      break;
    case 'month':
      date.setMonth(date.getMonth() + intervalCount);
      break;
    case 'year':
      date.setFullYear(date.getFullYear() + intervalCount);
      break;
    default: date.setMonth(date.getMonth() + 1);
  }

  return date;
}

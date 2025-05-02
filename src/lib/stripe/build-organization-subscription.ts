import type { Stripe } from 'stripe';

enum UserPlanStatus {
  AwaitingPayment = 'awaitingPayment',
  Paid = 'paid',
}

interface UserSubscriptionSubscription {
  id: string;
  priceId: string;

  status: UserPlanStatus;
  currency: string | null;

  interval: string | null;
  intervalCount: number | null;

  createdAt: number | Date;
  start_date: number | Date;
  cancel_at: number | null;
  canceled_at: number | null;
  ended_at: number | null;
  expires_at: Date;
}

export function buildOrganizationSubscription(
  subscription: Stripe.Subscription,
  status: UserPlanStatus = UserPlanStatus.Paid
): UserSubscriptionSubscription {
  const lineItem = subscription.items.data[0];
  const price = lineItem.price;

  const interval = price?.recurring?.interval ?? null;
  const intervalCount = price?.recurring?.interval_count ?? 1;

  const createdAt = subscription.created * 1000; // Stripe gives timestamps in seconds
  const expiresAt = calculateExpirationDate(createdAt, interval, intervalCount);

  return {
    id: subscription.id,
    priceId: price?.id,
    status,
    currency: price?.currency ?? null,
    interval,
    intervalCount,
    createdAt,
    start_date: subscription.start_date * 1000,
    ended_at: subscription.ended_at ? subscription.ended_at * 1000 : null,
    cancel_at: subscription?.cancel_at ? subscription.cancel_at * 1000 : null,
    canceled_at: subscription.canceled_at ? subscription.canceled_at * 1000 : null,
    expires_at: expiresAt
  };
}

function calculateExpirationDate(
  createdAt: number,
  interval: string | null,
  intervalCount: number
): Date {
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

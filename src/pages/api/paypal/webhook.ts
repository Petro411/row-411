import { withMethod } from "@/lib/middlewares/withMethod"
import { dbConnect } from "@/lib/mongodb/dbConnect"
import Subscription from "@/lib/mongodb/models/Subscription"
import type { NextApiResponse } from "next"
import getRawBody from "raw-body"

export const config = {
  api: {
    bodyParser: false,
  },
}

enum PayPalWebhookEvents {
  PaymentCaptureCompleted = "PAYMENT.CAPTURE.COMPLETED",
  PaymentCaptureRefunded = "PAYMENT.CAPTURE.REFUNDED",
  BillingSubscriptionActivated = "BILLING.SUBSCRIPTION.ACTIVATED",
  BillingSubscriptionCancelled = "BILLING.SUBSCRIPTION.CANCELLED",
  BillingSubscriptionSuspended = "BILLING.SUBSCRIPTION.SUSPENDED",
  BillingSubscriptionPaymentCompleted = "BILLING.SUBSCRIPTION.PAYMENT.COMPLETED",
}

async function handler(req: any, res: NextApiResponse) {
  try {
    const rawBody = await getRawBody(req)
    const body = JSON.parse(rawBody.toString())

    // Verify webhook signature (optional but recommended)
    const webhookSignature = req.headers["paypal-transmission-sig"]
    const webhookId = req.headers["paypal-transmission-id"]
    const webhookTimestamp = req.headers["paypal-transmission-time"]
    const certId = req.headers["paypal-cert-id"]

    // For production, you should verify the webhook signature
    // This is a simplified version - implement proper verification for production

    await dbConnect()

    switch (body.event_type) {
      case PayPalWebhookEvents.PaymentCaptureCompleted: {
        await handlePaymentCompleted(body)
        break
      }

      case PayPalWebhookEvents.BillingSubscriptionActivated: {
        await handleSubscriptionActivated(body)
        break
      }

      case PayPalWebhookEvents.BillingSubscriptionCancelled: {
        await handleSubscriptionCancelled(body)
        break
      }

      case PayPalWebhookEvents.BillingSubscriptionPaymentCompleted: {
        await handleSubscriptionPaymentCompleted(body)
        break
      }

      default:
        console.log(`Unhandled PayPal webhook event: ${body.event_type}`)
    }

    res.status(200).json({ success: true })
  } catch (error: any) {
    console.error("PayPal webhook error:", error)
    return res.status(500).json({
      message: error?.message || "Webhook processing failed",
      success: false,
    })
  }
}

async function handlePaymentCompleted(event: any) {
  const payment = event.resource
  const customData = JSON.parse(payment.custom_id || "{}")

  if (customData.userId) {
    // Update user or subscription status if needed
    console.log("Payment completed for user:", customData.userId)
  }
}

async function handleSubscriptionActivated(event: any) {
  const subscription = event.resource
  const customData = JSON.parse(subscription.custom_id || "{}")

  if (customData.userId) {
    await Subscription.findOneAndUpdate({ subscriptionId: `paypal_${subscription.id}` }, { status: "active" })
  }
}

async function handleSubscriptionCancelled(event: any) {
  const subscription = event.resource

  await Subscription.findOneAndUpdate(
    { subscriptionId: `paypal_${subscription.id}` },
    {
      status: "cancelled",
      canceled_at: Math.floor(Date.now() / 1000),
    },
  )
}

async function handleSubscriptionPaymentCompleted(event: any) {
  const payment = event.resource
  const subscriptionId = payment.billing_agreement_id

  // Reset monthly downloads or update subscription
  await Subscription.findOneAndUpdate(
    { subscriptionId: `paypal_${subscriptionId}` },
    {
      downloadsThisMonth: 0,
      expires_at: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
    },
  )
}

export default withMethod(handler, ["POST"])

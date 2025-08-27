import { withMethod } from "@/lib/middlewares/withMethod"
import { dbConnect } from "@/lib/mongodb/dbConnect"
import User from "@/lib/mongodb/models/User"
import Subscription from "@/lib/mongodb/models/Subscription"
import { HttpException } from "@/utils/HttpException"
import type { NextApiResponse } from "next"
import JWT from "jsonwebtoken"
import { paypalClient } from "@/lib/paypal/client"

const JWT_SECRET = process.env.JWT_SECRET ?? ""

async function handler(req: any, res: NextApiResponse) {
  try {
    const { orderId, token } = req.body

    if (!token) {
      throw new HttpException("Unauthorized", 401)
    }

    const decoded = JWT.verify(token, JWT_SECRET) as { id: string }
    await dbConnect()

    const user = await User.findById(decoded.id).select(["-password"])
    if (!user) {
      throw new HttpException("User not found", 404)
    }

    // Capture the PayPal order
    const captureResult = await paypalClient.captureOrder(orderId)

    if (captureResult.status !== "COMPLETED") {
      throw new HttpException("Payment not completed", 400)
    }

    // Extract custom data
    const customData = JSON.parse(captureResult.purchase_units[0].custom_id || "{}")
    const { userId, priceId, planId } = customData

    // Create subscription record
    const subscriptionData = {
      subscriptionId: `paypal_${orderId}`,
      userId: userId,
      priceId: priceId,
      status: "paid",
      currency: captureResult.purchase_units[0].amount.currency_code,
      interval: "month", // Default to monthly
      intervalCount: 1,
      start_date: Math.floor(Date.now() / 1000),
      expires_at: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // 30 days from now
      amount: Number.parseFloat(captureResult.purchase_units[0].amount.value),
      monthlyDownloadLimit: 10, // Default limit
      totalDownloads: 0,
      downloadsThisMonth: 0,
    }

    const userSubscription = await Subscription.create(subscriptionData)

    // Update user with subscription
    await User.findByIdAndUpdate(userId, {
      subscription: userSubscription._id,
      customer_id: captureResult.payer?.payer_id || "GUEST", // Handle guest checkout
      isOnboarded: true,
    })

    return res.status(200).json({
      success: true,
      subscription: userSubscription,
    })
  } catch (error: any) {
    console.error("PayPal capture order error:", error)
    return res.status(error?.statusCode ?? 500).json({
      message: error?.message || "Internal server error",
      success: false,
      status: error?.statusCode ?? 500,
    })
  }
}

export default withMethod(handler, ["POST"])
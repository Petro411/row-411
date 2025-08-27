import { withMethod } from "@/lib/middlewares/withMethod"
import { dbConnect } from "@/lib/mongodb/dbConnect"
import User from "@/lib/mongodb/models/User"
import Plan from "@/lib/mongodb/models/Plan"
import { HttpException } from "@/utils/HttpException"
import type { NextApiResponse } from "next"
import JWT from "jsonwebtoken"
import { paypalClient } from "@/lib/paypal/client"

const JWT_SECRET = process.env.JWT_SECRET ?? ""

async function handler(req: any, res: NextApiResponse) {
  try {
    const { priceId, token } = req.body

    if (!token) {
      throw new HttpException("Unauthorized", 401)
    }

    const decoded = JWT.verify(token, JWT_SECRET) as { id: string }
    await dbConnect()

    const user = await User.findById(decoded.id).select(["-password"])
    if (!user) {
      throw new HttpException("User not found", 404)
    }

    const plan = await Plan.findOne({ priceId })
    if (!plan) {
      throw new HttpException("Plan not found", 404)
    }

    // Create PayPal order with guest checkout support
    const order = await paypalClient.createOrder(
      plan.amount,
      "USD",
      JSON.stringify({ userId: user._id.toString(), priceId, planId: plan._id.toString() })
    )

    if (order.error) {
      throw new HttpException(order.error.message || "Failed to create PayPal order", 400)
    }

    return res.status(200).json({
      orderId: order.id,
      approvalUrl: order.links?.find((link: any) => link.rel === "approve")?.href,
      success: true,
    })
  } catch (error: any) {
    console.error("PayPal create order error:", error)
    return res.status(error?.statusCode ?? 500).json({
      message: error?.message || "Internal server error",
      success: false,
      status: error?.statusCode ?? 500,
    })
  }
}

export default withMethod(handler, ["POST"])
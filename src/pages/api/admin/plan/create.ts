import { withAuth } from "@/lib/middlewares/withAuth";
import { withCors } from "@/lib/middlewares/withCors";
import { withMethod } from "@/lib/middlewares/withMethod";
import { withRoleAuth } from "@/lib/middlewares/withRoleAuth";
import Plan from "@/lib/mongodb/models/Plan";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

const handler = async (req: any, res: any) => {
  try {
    const { title, subtitle, description, features, priceId, amount } = req.body;

    if (!priceId || typeof amount !== 'number') {
      return res.status(400).json({
        success: false,
        message: "Missing Stripe price ID or amount",
      });
    }

    let stripePrice;
    try {
      stripePrice = await stripe.prices.retrieve(priceId);
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Invalid Stripe price ID",
      });
    }

    const expectedUnitAmount = Math.round(amount * 100); 
    if (stripePrice.unit_amount !== expectedUnitAmount) {
      return res.status(400).json({
        success: false,
        message: `Provided amount ($${amount}) does not match Stripe price amount ($${(stripePrice.unit_amount ?? 0) / 100})`,
      });
    }

    const existingPlan = await Plan.findOne({ priceId });
    if (existingPlan) {
      return res.status(409).json({
        success: false,
        message: "A plan with this Stripe price ID already exists",
      });
    }

    const plan = await Plan.create({
      title,
      subtitle,
      description,
      features,
      priceId,
      amount, 
    });

    return res.status(200).json({
      success: true,
      data: plan,
    });
  } catch (error: any) {
    return res.status(error?.statusCode ?? 500).json({
      message: error?.message || "Internal Server Error",
      success: false,
      status: error?.statusCode ?? 500,
    });
  }
};

export default withCors(
  withAuth(withRoleAuth(withMethod(handler, ["POST"]), ["admin"]))
);

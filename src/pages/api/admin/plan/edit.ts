import { withRoleAuth } from "@/lib/middlewares/withRoleAuth";
import { withMethod } from "@/lib/middlewares/withMethod";
import { withCors } from "@/lib/middlewares/withCors";
import { withAuth } from "@/lib/middlewares/withAuth";
import Plan from "@/lib/mongodb/models/Plan";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion:"2025-08-27.basil",
});

const handler = async (req: any, res: any) => {
  try {
    const { planId, priceId, amount, title, subtitle, description, features, downloadLimit } = req.body;

    if (!planId || !priceId || typeof amount !== 'number') {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: planId, priceId, or amount",
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

    const duplicate = await Plan.findOne({ priceId, _id: { $ne: planId } });
    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: "Another plan already uses this Stripe price ID",
      });
    }

    const updated = await Plan.findByIdAndUpdate(planId, {
      title,
      subtitle,
      description,
      features,
      priceId,
      amount,
      downloadLimit,
    }, { new: true });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    return res.status(200).json({ success: true, data: updated });
  } catch (error: any) {
    return res.status(error?.statusCode ?? 500).json({
      message: error?.message || "Internal Server Error",
      success: false,
      status: error?.statusCode ?? 500,
    });
  }
};

export default withCors(
  withAuth(withRoleAuth(withMethod(handler, ["PUT"]), ["admin"]))
);

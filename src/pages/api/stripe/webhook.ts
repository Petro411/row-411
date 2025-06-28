import Label from "@/config/Label";
import { withMethod } from "@/lib/middlewares/withMethod";
import { dbConnect } from "@/lib/mongodb/dbConnect";
import User from "@/lib/mongodb/models/User";
import { HttpException } from "@/utils/HttpException";
import { NextApiResponse } from "next";
import JWT from "jsonwebtoken";
import Stripe from "stripe";
import getRawBody from 'raw-body';
import { buildOrganizationSubscription } from "@/lib/stripe/build-organization-subscription";
import Subscription from "@/lib/mongodb/models/Subscription";

const STRIPE_SIGNATURE_HEADER = 'stripe-signature';

enum StripeWebhooks {
    AsyncPaymentSuccess = 'checkout.session.async_payment_succeeded',
    Completed = 'checkout.session.completed',
    AsyncPaymentFailed = 'checkout.session.async_payment_failed',
    SubscriptionDeleted = 'customer.subscription.deleted',
    SubscriptionUpdated = 'customer.subscription.updated',
}

const JWT_SECRET = process.env.JWT_SECRET ?? "";
const siteUrl = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_SITE_URL : 'http://localhost:3000';
export const config = {
    api: {
        bodyParser: false,
    },
};


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-03-31.basil",
});

const webhookSecret = process.env.NODE_ENV === "development" ? process.env.STRIPE_WEBHOOK_SECRET : process.env.STRIPE_WEBHOOK_SECRET_LIVE
const webhookSecretKey = webhookSecret ?? "";


async function handler(
    req: any,
    res: NextApiResponse
) {

    try {

        const signature = req.headers[STRIPE_SIGNATURE_HEADER];
        const rawBody = await getRawBody(req);
        const event = await stripe.webhooks.constructEvent(rawBody, signature, webhookSecretKey);
        await dbConnect();

        switch (event.type) {
            case StripeWebhooks.Completed: {
                const session = event.data.object as Stripe.Checkout.Session;
                const subscriptionId = session.subscription as string;
                const subscription = await stripe.subscriptions.retrieve(
                    subscriptionId
                );

                await onCheckoutCompleted(session, subscription);
                break;
            }

            case StripeWebhooks.AsyncPaymentSuccess: {
                const session = event.data.object as Stripe.Checkout.Session;
                const organizationId = session.client_reference_id as string;

                // console.log(session, "session")
                // console.log(organizationId, "organizationId")

                // await activatePendingSubscription(organizationId);

                break;
            }

            case StripeWebhooks.SubscriptionDeleted: {
                const subscription = event.data.object as Stripe.Subscription;
                console.log(subscription, "subscription");

                // await deleteOrganizationSubscription(subscription.id);

                break;
            }

            case StripeWebhooks.SubscriptionUpdated: {
                const subscription = event.data.object as Stripe.Subscription;
                await onSubscriptionUpdated(subscription);

                break;
            }
        }

        res.status(200).send({ success: true });



    } catch (error: any) {
        // console.log(error)
        return res.status(error?.statusCode ?? 500).json({
            message: error?.message,
            success: false,
            status: error?.statusCode ?? 500
        })
        // res.redirect([`${siteUrl}/subscription`, 'error=true'].join("?"));

    }

}

export default withMethod(handler, ['POST']);



async function onCheckoutCompleted(
    session: Stripe.Checkout.Session,
    subscription: Stripe.Subscription
) {
    const userId = session.client_reference_id as string;
    const customerId = session.customer as string;
    const status = getOrderStatus(session.payment_status);

    const subscriptionData = buildOrganizationSubscription({ ...subscription, userId, monthlyDownloadLimit: session?.metadata?.monthlyDownloadLimit ?? "" }, status);

    const userSubscription = await Subscription.create(subscriptionData);
    await User.findByIdAndUpdate(userId, {
        subscription: userSubscription._id,
        customer_id: customerId,
        isOnboarded: true
    })
};

async function onSubscriptionUpdated(
    subscription: Stripe.Subscription
) {
    const user = await User.findOne({ customer_id: subscription.customer });
    const subscriptionData = await buildOrganizationSubscription({ ...subscription, userId: user?._id, monthlyDownloadLimit: "0" });
    await Subscription.findByIdAndUpdate(user?.subscription, subscriptionData);
};


function getOrderStatus(paymentStatus: string) {
    const isPaid = paymentStatus === 'paid';

    return isPaid
        ? UserPlanStatus.Paid
        : UserPlanStatus.AwaitingPayment;
}

enum UserPlanStatus {
    AwaitingPayment = 'awaitingPayment',
    Paid = 'paid',
}
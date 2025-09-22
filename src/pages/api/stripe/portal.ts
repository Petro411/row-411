import { withMethod } from "@/lib/middlewares/withMethod";
import { HttpException } from "@/utils/HttpException";
import { dbConnect } from "@/lib/mongodb/dbConnect";
import User from "@/lib/mongodb/models/User";
import { parseCookies } from "nookies";
import { NextApiResponse } from "next";
import JWT from "jsonwebtoken";
import Stripe from "stripe";


const JWT_SECRET = process.env.JWT_SECRET ?? "";
const siteUrl = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_SITE_URL : 'http://localhost:3000';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-08-27.basil",
});


async function handler(
    req: any,
    res: NextApiResponse
) {

    try {

        const cookies = parseCookies({ req });
        const token = cookies.token;

        if (!token) {
            throw new HttpException("Unauthorized", 400);
        }

        const decoded = JWT.verify(token, JWT_SECRET) as { id: string };

        await dbConnect();

        const user = await User.findById(decoded.id).select(['-password']);

        if (!user) {
            res.redirect('/auth/sign-up');
        }

        const session = await stripe.billingPortal.sessions.create({
            customer: user?.customer_id,
            return_url: `${siteUrl}/profile`
        })

        // res.redirect(303, session.url);
        return res.send({session:session.url})

    } catch (error: any) {
        console.log(error)
        res.redirect([`${siteUrl}/subscription`, 'error=true'].join("?"));
    }

}

export default withMethod(handler, ['GET']);
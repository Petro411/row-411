import Subscription from "@/lib/mongodb/models/Subscription";
import { withMethod } from "@/lib/middlewares/withMethod";
import { withCors } from "@/lib/middlewares/withCors";
import { withAuth } from "@/lib/middlewares/withAuth";
import User from "@/lib/mongodb/models/User";

import { UserPlanStatus } from "../../../../types/subscription";


const handler = async (req: any, res: any) => {
    try {
        const totalUsers = await User.countDocuments({ role: "user" });
        const totalCustomers = await User.countDocuments({ isOnboarded: true });
        const totalSubscriptions = await getTotalActiveSubscriptionsAmount();

        return res.status(200).json({
            totalUsers,
            totalCustomers,
            totalSubscriptions
        });
    } catch (error: any) {
        return res.status(error?.statusCode ?? 500).json({
            message: error?.message,
            success: false,
            status: error?.statusCode ?? 500
        })
    }
};

const getTotalActiveSubscriptionsAmount = async () => {
    const result = await Subscription.aggregate([
        {
            $match: {
                status: UserPlanStatus.Paid,
                start_date: { $type: "number", $gt: 0 }
            },
        },
        {
            $project: {
                amount: 1,
                createdAt: 1,
      month: { $month: "$createdAt" },
            },
        },
        {
            $group: {
                _id: "$month",
                totalAmount: { $sum: "$amount" },
            },
        },
        {
            $project: {
                month: "$_id",
                totalAmount: { $divide: ["$totalAmount", 100] },
                _id: 0
            },
        },
        {
            $sort: { month: 1 },
        }
    ]);

    return result;
};

export default withCors(withAuth(withMethod(handler, ['GET'])));
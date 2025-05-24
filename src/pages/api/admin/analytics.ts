import { withAuth } from "@/lib/middlewares/withAuth";
import { withCors } from "@/lib/middlewares/withCors";
import { withMethod } from "@/lib/middlewares/withMethod";
import User from "@/lib/mongodb/models/User";

const handler = async (req: any, res: any) => {
    try {
        const totalUsers = await User.countDocuments({role:"user"});
        const totalCustomers = await User.countDocuments({ isOnboarded: true });

        return res.status(200).json({
            totalUsers,
            totalCustomers,
        });
    } catch (error: any) {
        return res.status(error?.statusCode ?? 500).json({
            message: error?.message,
            success: false,
            status: error?.statusCode ?? 500
        })
    }
};

export default withCors(withAuth(withMethod(handler, ['GET'])));
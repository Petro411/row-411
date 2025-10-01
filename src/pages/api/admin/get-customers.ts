import { withMethod } from "@/lib/middlewares/withMethod";
import { withCors } from "@/lib/middlewares/withCors";
import { withAuth } from "@/lib/middlewares/withAuth";
import User from "@/lib/mongodb/models/User";


const handler = async (req: any, res: any) => {
    try {

        let { page = 1, limit = 10 } = req.query;

        page = parseInt(page, 10);
        limit = parseInt(limit, 10);

        if (isNaN(page) || page < 1) page = 1;
        if (isNaN(limit) || limit < 1) limit = 10;

        const skip = (page - 1) * limit;

        const [users, total] = await Promise.all([
            User.find({ role: "user" }).select(['-password']).populate({ path: "subscription", select: ['amount', 'status', 'start_date', 'expires_at', 'totalDownloads', 'monthlyDownloadLimit', 'downloads_list'] })
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 })
                .lean(),
            User.countDocuments(),
        ]);
        return res.status(200).json({
            users,
            total,
            page,
            limit,
            success: true,
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
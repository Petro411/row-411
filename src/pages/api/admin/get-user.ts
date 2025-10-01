import { withMethod } from "@/lib/middlewares/withMethod";
import { withCors } from "@/lib/middlewares/withCors";
import { withAuth } from "@/lib/middlewares/withAuth";
import { HttpException } from "@/utils/HttpException";
import User from "@/lib/mongodb/models/User";
import Label from "@/config/Label";


const handler = async (req: any, res: any) => {
    try {
        const { id } = req.query;
        if (!id) {
            throw new HttpException(Label.ParamIdIsReq, 400);
        }
        const user = await User.findById(id).select(['-password']).populate({ path: "subscription", select: ['monthlyDownloadLimit','amount', 'start_date', 'expires_at', 'ended_at', 'canceled_at', 'totalDownloads', 'downloads_list'] });

        if (!user) {
            throw new HttpException(Label.UserNotFound, 404);
        }

        return res.status(200).json({ success: true, user })

    } catch (error: any) {
        return res.status(error?.statusCode ?? 500).json({
            message: error?.message,
            success: false,
            status: error?.statusCode ?? 500
        })
    }
};

export default withCors(withAuth(withMethod(handler, ['GET'])));
import { withAuth } from "@/lib/middlewares/withAuth";
import { withCors } from "@/lib/middlewares/withCors";
import { withMethod } from "@/lib/middlewares/withMethod";
import { withRoleAuth } from "@/lib/middlewares/withRoleAuth";
import User from "@/lib/mongodb/models/User";

const handler = async (req: any, res: any) => {
    try {

        const data = req.body;

        await User.findByIdAndUpdate(data?.id, data);

        return res.status(200).json({ success: true })

    } catch (error: any) {
        return res.status(error?.statusCode ?? 500).json({
            message: error?.message,
            success: false,
            status: error?.statusCode ?? 500
        })
    }
};

export default withCors(withAuth(withRoleAuth(withMethod(handler, ['PUT']), ['admin'])));
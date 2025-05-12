import { withAuth } from "@/lib/middlewares/withAuth";
import { withCors } from "@/lib/middlewares/withCors";
import { withMethod } from "@/lib/middlewares/withMethod";
import User from "@/lib/mongodb/models/User";

const handler = async (req: any, res: any) => {
    try {

        const user = req.user;
        const data = req.body;

        await User.findByIdAndUpdate(user?._id, data);
       
        return res.status(200).json({ success:true})

    } catch (error: any) {
        return res.status(error?.statusCode ?? 500).json({
            message: error?.message,
            success: false,
            status: error?.statusCode ?? 500
        })
    }
};

export default withCors(withAuth(withMethod(handler, ['POST'])));
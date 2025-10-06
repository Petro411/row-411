import { withRoleAuth } from "@/lib/middlewares/withRoleAuth";
import Subscription from "@/lib/mongodb/models/Subscription";
import { withMethod } from "@/lib/middlewares/withMethod";
import { withCors } from "@/lib/middlewares/withCors";
import { withAuth } from "@/lib/middlewares/withAuth";
import { HttpException } from "@/utils/HttpException";
import User from "@/lib/mongodb/models/User";
import { label } from "@/branding";


const handler = async (req: any, res: any) => {
    try {

        const {id} = req.query;
        if(!id?.trim()?.length) throw new HttpException(label.ParamIdIsReq,400);

        await Subscription.findOneAndDelete({userId:id});
        await User.findByIdAndDelete(id)

        return res.status(200).json({ success: true })

    } catch (error: any) {
        return res.status(error?.statusCode ?? 500).json({
            message: error?.message,
            success: false,
            status: error?.statusCode ?? 500
        })
    }
};

export default withCors(withAuth(withRoleAuth(withMethod(handler, ['DELETE']), ['admin'])));
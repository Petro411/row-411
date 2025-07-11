import { withMethod } from "@/lib/middlewares/withMethod";
import { withCors } from "@/lib/middlewares/withCors";
import { withAuth } from "@/lib/middlewares/withAuth";
import User from "@/lib/mongodb/models/User";


const handler = async (req: any, res: any) => {
    try {

       const users = await User.find({}).select(['-password']).populate({path:"subscription",select:['amount']});
       
        return res.status(200).json({ success:true, users})

    } catch (error: any) {
        return res.status(error?.statusCode ?? 500).json({
            message: error?.message,
            success: false,
            status: error?.statusCode ?? 500
        })
    }
};

export default withCors(withAuth(withMethod(handler, ['GET'])));
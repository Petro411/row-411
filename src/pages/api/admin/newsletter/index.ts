import { withAuth } from "@/lib/middlewares/withAuth";
import { withCors } from "@/lib/middlewares/withCors";
import { withMethod } from "@/lib/middlewares/withMethod"
import Newsletter from "@/lib/mongodb/models/Newsletter";

async function handler(req: any, res: any) {
 try {
    const newsletters = await Newsletter.find({})
    return res.status(200).json({newsletters,success:true});
 } catch (error:any) {
     return res.status(error?.statusCode ?? 500).json({
            message: error?.message,
            success: false,
            status: error?.statusCode ?? 500
        })
 }
}
export default withCors(withAuth(withMethod(handler,['GET'])))
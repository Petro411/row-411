import { withCors } from "@/lib/middlewares/withCors";
import { withMethod } from "@/lib/middlewares/withMethod"
import { dbConnect } from "@/lib/mongodb/dbConnect";
import Faq from "@/lib/mongodb/models/Faq";

async function handler(req: any, res: any) {
 try {
    await dbConnect();
    const faqs = await Faq.find({});
    return res.status(200).json({faqs,success:true});
 } catch (error:any) {
     return res.status(error?.statusCode ?? 500).json({
            message: error?.message,
            success: false,
            status: error?.statusCode ?? 500
        })
 }
}
export default withCors(withMethod(handler,['GET']))
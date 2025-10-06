import { withMethod } from "@/lib/middlewares/withMethod";
import { withCors } from "@/lib/middlewares/withCors";
import { HttpException } from "@/utils/HttpException";
import { dbConnect } from "@/lib/mongodb/dbConnect";
import Page from "@/lib/mongodb/models/Page";
import { label } from "@/branding";


async function handler(req: any, res: any) {
 try {
    await dbConnect();
    const {slug} = req.query;
    const page = await Page.findOne({slug});
    if(!page) throw new HttpException(label.PageNotFound,404);
    return res.status(200).json({page,success:true});
 } catch (error:any) {
     return res.status(error?.statusCode ?? 500).json({
            message: error?.message,
            success: false,
            status: error?.statusCode ?? 500
        })
 }
}
export default withCors(withMethod(handler,['GET']))
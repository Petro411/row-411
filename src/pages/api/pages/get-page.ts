import Label from "@/config/Label";
import { withMethod } from "@/lib/middlewares/withMethod"
import { dbConnect } from "@/lib/mongodb/dbConnect";
import Page from "@/lib/mongodb/models/Page"
import { HttpException } from "@/utils/HttpException";

async function handler(req: any, res: any) {
 try {
    await dbConnect();
    const {slug} = req.query;
    const page = await Page.findOne({slug}).select(['content']);
    if(!page) throw new HttpException(Label.PageNotFound,404);
    return res.status(200).json({content:page?.content,success:true});
 } catch (error:any) {
     return res.status(error?.statusCode ?? 500).json({
            message: error?.message,
            success: false,
            status: error?.statusCode ?? 500
        })
 }
}
export default withMethod(handler,['GET'])
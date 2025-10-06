import { withMethod } from "@/lib/middlewares/withMethod";
import { withCors } from "@/lib/middlewares/withCors";
import { withAuth } from "@/lib/middlewares/withAuth";
import { HttpException } from "@/utils/HttpException";
import Page from "@/lib/mongodb/models/Page";
import { label } from "@/branding";


const handler = async (req: any, res: any) => {
    try {
        const { slug, title, content } = req.body;
        if(!slug?.trim() || !title?.trim() || !content?.trim()) throw new HttpException(label.AllFieldsReq,400);
        const page = await Page.create({slug,title,content});
        return res.status(200).json({ page, success: true });
    } catch (error: any) {
        return res.status(error?.statusCode ?? 500).json({
            message: error?.message,
            success: false,
            status: error?.statusCode ?? 500
        })
    }
}
export default withCors(withAuth(withMethod(handler, ['POST'])));
import Label from "@/config/Label";
import { withAuth } from "@/lib/middlewares/withAuth";
import { withCors } from "@/lib/middlewares/withCors";
import { withMethod } from "@/lib/middlewares/withMethod"
import Page from "@/lib/mongodb/models/Page"
import { HttpException } from "@/utils/HttpException";

const handler = async (req: any, res: any) => {
    try {
        const { slug, title, content, id } = req.body;
        if (!slug?.trim() || !title?.trim() || !content?.trim() || !id?.length) throw new HttpException(Label.AllFieldsReq, 400);
        await Page.findByIdAndUpdate(id, { slug, title, content });
        return res.status(200).json({ success: true });
    } catch (error: any) {
        return res.status(error?.statusCode ?? 500).json({
            message: error?.message,
            success: false,
            status: error?.statusCode ?? 500
        })
    }
}
export default withCors(withAuth(withMethod(handler, ['POST'])));
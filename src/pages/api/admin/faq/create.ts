import Label from "@/config/Label";
import { withAuth } from "@/lib/middlewares/withAuth";
import { withCors } from "@/lib/middlewares/withCors";
import { withMethod } from "@/lib/middlewares/withMethod"
import Faq from "@/lib/mongodb/models/Faq";
import { HttpException } from "@/utils/HttpException";

const handler = async (req: any, res: any) => {
    try {
        const { title, description } = req.body;
        if(!title?.trim() || !description?.trim()) throw new HttpException(Label.AllFieldsReq,400);
        const faq = await Faq.create({title,description});
        return res.status(200).json({ faq, success: true });
    } catch (error: any) {
        return res.status(error?.statusCode ?? 500).json({
            message: error?.message,
            success: false,
            status: error?.statusCode ?? 500
        })
    }
}
export default withCors(withAuth(withMethod(handler, ['POST'])));
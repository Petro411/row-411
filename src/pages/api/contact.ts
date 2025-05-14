import Label from "@/config/Label";
import { withMethod } from "@/lib/middlewares/withMethod"
import Contact from "@/lib/mongodb/models/Contact";
import { HttpException } from "@/utils/HttpException";

async function handler(req: any, res: any) {
    try {
        const { name, email, phone, message } = req.body
        if (!name?.trim()?.length || !email?.trim()?.length || !phone?.trim()?.length || !message?.trim()?.length) throw new HttpException(Label.AllFieldsReq, 400);

        await Contact.create(req.body);

        return res.status(200).json({ success: true });
    } catch (error: any) {
        return res.status(error?.statusCode ?? 500).json({
            message: error?.message,
            success: false,
            status: error?.statusCode ?? 500
        })
    }
}
export default (withMethod(handler, ['POST']))
import Label from "@/config/Label";
import { withAuth } from "@/lib/middlewares/withAuth";
import { withCors } from "@/lib/middlewares/withCors";
import { withMethod } from "@/lib/middlewares/withMethod"
import Location from "@/lib/mongodb/models/Location";
import { HttpException } from "@/utils/HttpException";

const handler = async (req: any, res: any) => {
    try {
        const { name, code, type } = req.body;
        if(!name?.trim() || !code?.trim() || !type?.trim()) throw new HttpException(Label.AllFieldsReq,400);
        const location = await Location.create({name,code,type});
        return res.status(200).json({ location, success: true });
    } catch (error: any) {
        return res.status(error?.statusCode ?? 500).json({
            message: error?.message,
            success: false,
            status: error?.statusCode ?? 500
        })
    }
}
export default withCors(withAuth(withMethod(handler, ['POST'])));
import Label from "@/config/Label";
import { withMethod } from "@/lib/middlewares/withMethod";
import { dbConnect } from "@/lib/mongodb/dbConnect";
import Newsletter from "@/lib/mongodb/models/Newsletter";
import { HttpException } from "@/utils/HttpException";

const handler = async (req: any, res: any) => {
    try {

        const { email, name } = req.body;
        if (!email?.trim()?.length) throw new HttpException(Label.AllFieldsReq, 400);

        await dbConnect();
        const isExists = await Newsletter.findOne({ email });

        if (isExists) return res.status(200).json({ message: Label.EmailAreadyRegisteredForNewsLetter, success: true });

        await Newsletter.create({ name, email });

        return res.status(200).json({ message: Label.EmailRegisteredForNewsLetter, success: true })


    } catch (error: any) {
        return res.status(error?.statusCode ?? 500).json({
            message: error?.message,
            success: false,
            status: error?.statusCode ?? 500
        })
    }
};

export default withMethod(handler, ['POST']);
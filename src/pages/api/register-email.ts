import { withMethod } from "@/lib/middlewares/withMethod";
import Newsletter from "@/lib/mongodb/models/Newsletter";
import { HttpException } from "@/utils/HttpException";
import { dbConnect } from "@/lib/mongodb/dbConnect";
import { label } from "@/branding";


const handler = async (req: any, res: any) => {
    try {

        const { email, name } = req.body;
        if (!email?.trim()?.length) throw new HttpException(label.AllFieldsReq, 400);

        await dbConnect();
        const isExists = await Newsletter.findOne({ email });

        if (isExists) return res.status(200).json({ message: label.EmailAreadyRegisteredForNewsLetter, success: true });

        await Newsletter.create({ name, email });

        return res.status(200).json({ message: label.EmailRegisteredForNewsLetter, success: true })


    } catch (error: any) {
        return res.status(error?.statusCode ?? 500).json({
            message: error?.message,
            success: false,
            status: error?.statusCode ?? 500
        })
    }
};

export default withMethod(handler, ['POST']);
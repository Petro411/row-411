import { withMethod } from "@/lib/middlewares/withMethod";
import { HttpException } from "@/utils/HttpException";
import { dbConnect } from "@/lib/mongodb/dbConnect";
import User from "@/lib/mongodb/models/User";
import { label } from "@/branding";
import bcrypt from "bcrypt";


const handler = async (req: any, res: any) => {
    try {

        const { email, password } = req.body

        if (!email || !password) {
            throw new HttpException(label.EmailPasswordReq, 400);
        }

        await dbConnect();

        const user = await User.findOne({ email });

        if (!user) {
            throw new HttpException(label.UserNotFound, 404);
        }


        const hash = await bcrypt.hash(password, 12);

        user.password = hash;
        await user.save();

        return res.status(200).json({ message: label.PasswordUpdated })


    } catch (error: any) {
        return res.status(error?.statusCode ?? 500).json({
            message: error?.message,
            success: false,
            status: error?.statusCode ?? 500
        })
    }
};

export default withMethod(handler, ['POST']);
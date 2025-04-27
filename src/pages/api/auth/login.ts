import Label from "@/config/Label";
import { withMethod } from "@/lib/middlewares/withMethod";
import { dbConnect } from "@/lib/mongodb/dbConnect";
import User from "@/lib/mongodb/models/User";
import { HttpException } from "@/utils/HttpException";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { setCookie } from 'nookies';

const JWT_SECRET = process.env.JWT_SECRET ?? "";

const handler = async (req: any, res: any) => {
    try {
        const { email, password } = req?.body;
        if (!email || !password) {
            throw new HttpException(Label.EmailPasswordReq, 400);
        }

        await dbConnect();

        let user = await User.findOne({ email });

        if (!user) {
            throw new HttpException(Label.UserNotRegisteredWithEmail, 404);
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
            throw new HttpException(Label.IncorrectCredentails, 400);
        };

        const token = JWT.sign({ id: user._id }, JWT_SECRET);

        setCookie({ res }, 'token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
            sameSite: 'lax',
        });

        return res.status(200).json({ message: Label.LoginSuccessfull, token })


    } catch (error: any) {
        return res.status(error?.statusCode ?? 500).json({
            message: error?.message,
            success: false,
            status: error?.statusCode ?? 500
        })
    }
};

export default withMethod(handler, ['POST']);
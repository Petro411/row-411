import Label from "@/config/Label";
import { withMethod } from "@/lib/middlewares/withMethod";
import { dbConnect } from "@/lib/mongodb/dbConnect";
import User from "@/lib/mongodb/models/User";
import { HttpException } from "@/utils/HttpException";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { setCookie } from 'nookies';

const JWT_SECRET = process.env.JWT_SECRET ?? "";
const MAXAGE = 60 * 60 * 24 * 7;

async function handler(req: any, res: any) {
    if (req.method !== "POST") {
        throw new HttpException(Label.MethodNotAllowed, 405);
    }

    try {
        await dbConnect();

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            throw new HttpException(Label.AllFieldsReq, 400);
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new HttpException(Label.UserAlreadyExistsWithEmail, 409);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = JWT.sign({ id: user._id }, JWT_SECRET);

        // setCookie({ res }, 'token', token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     maxAge: 60 * 60 * 24 * 7,
        //     path: '/',
        //     sameSite: 'lax',
        // });

        res.status(201).json({
            message: Label.SignUpSuccessfull,
            token,
        });
    } catch (error: any) {
        console.error("Signup error:", error);
        res.status(500).json({ message: error?.message ?? Label.InternalServerError, success: false, status: error?.statusCode ?? 500 });
    }
}

export default withMethod(handler, ["POST"]);

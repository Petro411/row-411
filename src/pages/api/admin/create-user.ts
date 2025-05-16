import Label from "@/config/Label";
import { withAuth } from "@/lib/middlewares/withAuth";
import { withCors } from "@/lib/middlewares/withCors";
import { withMethod } from "@/lib/middlewares/withMethod";
import { dbConnect } from "@/lib/mongodb/dbConnect";
import User from "@/lib/mongodb/models/User";
import { HttpException } from "@/utils/HttpException";
import bcrypt from "bcrypt";

async function handler(req: any, res: any) {
    if (req.method !== "POST") {
        throw new HttpException(Label.MethodNotAllowed, 405);
    }

    try {
        await dbConnect();

        const { name, email, password, role } = req.body;

        if (!name?.trim()?.length || !email?.trim()?.length || !password?.trim()?.length || !role?.trim()?.length) {
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
            role,
            ...req.body
        });

        return res.status(201).json({
            user: {
                name: user?.name,
                email: user?.email,
                role: user?.role,
                picture: user?.picture,
                _id:user?._id
            },
            message: Label.SignUpSuccessfull,
        });
    } catch (error: any) {
        console.error("Signup error:", error);
        res.status(500).json({ message: error?.message ?? Label.InternalServerError, success: false, status: error?.statusCode ?? 500 });
    }
}

export default withCors(withAuth(withMethod(handler, ["POST"])))

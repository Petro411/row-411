import { withMethod } from "@/lib/middlewares/withMethod";
import { withCors } from "@/lib/middlewares/withCors";
import { withAuth } from "@/lib/middlewares/withAuth";
import { HttpException } from "@/utils/HttpException";
import { dbConnect } from "@/lib/mongodb/dbConnect";
import User from "@/lib/mongodb/models/User";
import { label } from "@/branding";
import bcrypt from "bcrypt";


async function handler(req: any, res: any) {
    if (req.method !== "POST") {
        throw new HttpException(label.MethodNotAllowed, 405);
    }

    try {
        await dbConnect();

        const { name, email, password, role } = req.body;

        if (!name?.trim()?.length || !email?.trim()?.length || !password?.trim()?.length || !role?.trim()?.length) {
            throw new HttpException(label.AllFieldsReq, 400);
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new HttpException(label.UserAlreadyExistsWithEmail, 409);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            ...req.body,
            name,
            email,
            role,
            password: hashedPassword,
        });

        return res.status(201).json({
            user: {
                name: user?.name,
                email: user?.email,
                role: user?.role,
                picture: user?.picture,
                _id: user?._id
            },
            message: label.SignUpSuccessfull,
        });
    } catch (error: any) {
        console.error("Signup error:", error);
        res.status(500).json({ message: error?.message ?? label.InternalServerError, success: false, status: error?.statusCode ?? 500 });
    }
}

export default withCors(withAuth(withMethod(handler, ["POST"])))

import { withMethod } from "@/lib/middlewares/withMethod";
import { HttpException } from "@/utils/HttpException";
import { dbConnect } from "@/lib/mongodb/dbConnect";
import User from "@/lib/mongodb/models/User";
import { label } from "@/branding";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";


const JWT_SECRET = process.env.JWT_SECRET ?? "";
const MAXAGE = 60 * 60 * 24 * 7;

async function handler(req: any, res: any) {
    if (req.method !== "POST") {
        throw new HttpException(label.MethodNotAllowed, 405);
    }

    try {
        await dbConnect();

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            throw new HttpException(label.AllFieldsReq, 400);
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new HttpException(label.UserAlreadyExistsWithEmail, 409);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = JWT.sign({ id: user._id }, JWT_SECRET);

        res.status(201).json({
            message: label.SignUpSuccessfull,
            token,
        });
    } catch (error: any) {
        console.error("Signup error:", error);
        res.status(500).json({ message: error?.message ?? label.InternalServerError, success: false, status: error?.statusCode ?? 500 });
    }
}

export default withMethod(handler, ["POST"]);

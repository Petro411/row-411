import { withMethod } from "@/lib/middlewares/withMethod";
import { withCors } from "@/lib/middlewares/withCors";
import { HttpException } from "@/utils/HttpException";
import { dbConnect } from "@/lib/mongodb/dbConnect";
import User from "@/lib/mongodb/models/User";
import { label } from "@/branding";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";


const JWT_SECRET = process.env.JWT_SECRET ?? "";

const handler = async (req: any, res: any) => {
    try {
        const { email, password } = req?.body;
        
        if (!email?.trim() || !password?.trim()) {
            throw new HttpException(label.EmailPasswordReq, 400);
        }

        await dbConnect();

        let user = await User.findOne({ email });

        if (!user) {
            throw new HttpException(label.UserNotRegisteredWithEmail, 404);
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
            throw new HttpException(label.IncorrectCredentails, 400);
        };

        const token = JWT.sign({ id: user._id }, JWT_SECRET);

        return res.status(200).json({ message: label.LoginSuccessfull, token })


    } catch (error: any) {
        return res.status(error?.statusCode ?? 500).json({
            message: error?.message,
            success: false,
            status: error?.statusCode ?? 500
        })
    }
};

export default withCors(withMethod(handler, ['POST']));
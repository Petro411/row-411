import Label from "@/config/Label";
import { withMethod } from "@/lib/middlewares/withMethod";
import { dbConnect } from "@/lib/mongodb/dbConnect";
import User from "@/lib/mongodb/models/User";
import { HttpException } from "@/utils/HttpException";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { parseCookies } from "nookies";

const JWT_SECRET = process.env.JWT_SECRET ?? "";

const handler = async (req: any, res: any) => {
    try {

        const cookies = parseCookies({ req });
        const token = cookies.token;
        if (!token) {
            throw new HttpException(Label.TokenMissing, 401);
        }

        const decoded = JWT.verify(token, JWT_SECRET) as { id: string };

        await dbConnect();

        const user = await User.findById(decoded.id);

        if (!user) {
            throw new HttpException(Label.UserNotFound, 404);
        }

        const { currentPassword, newPassword } = req?.body;
        if (!currentPassword || !newPassword) {
            throw new HttpException(Label.EmailPasswordReq, 400);
        }

        if (currentPassword === newPassword) {
            throw new HttpException(Label.PasswordCantBeSame, 400);
        }

        await dbConnect();

        const matchPassword = await bcrypt.compare(currentPassword, user?.password);

        if (!matchPassword) {
            throw new HttpException(Label.CurrentPasswordNotMatched, 400);
        }

        const hash = await bcrypt.hash(newPassword, 12);

        user.password = hash;
        await user.save();

        return res.status(200).json({ message: Label.PasswordUpdated, token })


    } catch (error: any) {
        return res.status(error?.statusCode ?? 500).json({
            message: error?.message,
            success: false,
            status: error?.statusCode ?? 500
        })
    }
};

export default withMethod(handler, ['POST']);
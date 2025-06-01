import Label from "@/config/Label";
import { withAuth } from "@/lib/middlewares/withAuth";
import { withCors } from "@/lib/middlewares/withCors";
import { withMethod } from "@/lib/middlewares/withMethod";
import { withRoleAuth } from "@/lib/middlewares/withRoleAuth";
import User from "@/lib/mongodb/models/User";
import { HttpException } from "@/utils/HttpException";
import bcrypt from "bcrypt";

const handler = async (req: any, res: any) => {
    try {
        const user = await User.findById(req.user?._id);

        const { currentPassword, newPassword } = req?.body;
        if (!currentPassword?.trim()?.length || !newPassword?.trim()?.length) {
            throw new HttpException(Label.EmailPasswordReq, 400);
        }

        if (currentPassword === newPassword) {
            throw new HttpException(Label.PasswordCantBeSame, 400);
        }

        const matchPassword = await bcrypt.compare(currentPassword, user?.password);

        if (!matchPassword) {
            throw new HttpException(Label.CurrentPasswordNotMatched, 400);
        }

        const hash = await bcrypt.hash(newPassword, 12);

        user.password = hash;
        await user.save();

        return res.status(200).json({ message: Label.PasswordUpdated })


    } catch (error: any) {
        return res.status(error?.statusCode ?? 500).json({
            message: error?.message,
            success: false,
            status: error?.statusCode ?? 500
        })
    }
};

export default withCors(withAuth(withRoleAuth(withMethod(handler, ['PUT']), ['admin'])));

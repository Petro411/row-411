import { withMethod } from "@/lib/middlewares/withMethod";
import { dbConnect } from "@/lib/mongodb/dbConnect";
import User from "@/lib/mongodb/models/User";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { setCookie } from 'nookies';

const JWT_SECRET = process.env.JWT_SECRET ?? "";

const handler = async (req: any, res: any) => {
    try {
        const { email, password } = req?.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password required."
            })
        }

        await dbConnect();

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found with this email." })
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
            return res.status(400).json({
                message: "Incorrect credentails."
            })
        };

        const token = JWT.sign({ id: user._id }, JWT_SECRET);

        setCookie({ res }, 'token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
            sameSite: 'lax',
        });

        return res.status(200).json({ message: "Login successfull.", token })


    } catch (error: any) {
        return res.status(error?.statusCode ?? 500).json({
            message: error?.message
        })
    }
};

export default withMethod(handler, ['POST']);
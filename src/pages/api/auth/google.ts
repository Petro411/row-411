import Label from "@/config/Label";
import { withMethod } from "@/lib/middlewares/withMethod";
import { dbConnect } from "@/lib/mongodb/dbConnect";
import User from "@/lib/mongodb/models/User";
import axios from "axios";
import JWT from "jsonwebtoken";
import { setCookie } from "nookies";


const JWT_SECRET = process.env.JWT_SECRET ?? "";

const getGoogleUser = async (token_type: string, token: string) => {
    return await axios.get(process.env.GOOGLE_LINK ?? "", {
        headers: { Authorization: `${token_type} ${token}` },
    });
}

const handler = async (req: any, res: any) => {
    try {

        let { token, token_type } = req.body;

        let response = await getGoogleUser(token_type, token);
        let data = response?.data;

        dbConnect();
        let findUser = await User.findOne({ email: data?.email });

        let jwtToken;

        if (!findUser) {
            let newUser = await User.create({
                name: data?.name,
                email: data?.email,
                password: process.env.JWT_SECRET
            });
            jwtToken = JWT.sign({ id: newUser?._id }, JWT_SECRET);

        }

        if (findUser) {
            jwtToken = JWT.sign({ id: findUser?._id }, JWT_SECRET);
        }

        setCookie({ res }, 'token', jwtToken ?? "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
            sameSite: 'lax',
        });

        return res.status(200).json({ message: Label.LoginSuccessfull, token: jwtToken })


    } catch (error: any) {
        return res.status(error?.statusCode ?? 500).json({
            success: false,
            status: error?.statusCode ?? 500,
            message: error?.message || Label.InternalServerError,
        });
    }
};

export default withMethod(handler, ['POST']);

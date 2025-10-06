import { HttpException } from "@/utils/HttpException";
import siteConfig from "@/config/site-config";
import { label } from "@/branding";
import JWT from "jsonwebtoken";

import { dbConnect } from "../mongodb/dbConnect";
import User from "../mongodb/models/User";


const JWT_SECRET = process.env.JWT_SECRET ?? "";

export const withAuth = (handler: any) => {
    return async (req: any, res: any) => {
        try {

            const token = req.headers.authorization;
            if (!token) {
                throw new HttpException(label.TokenMissing, 401);
            }

            const decoded = JWT.verify(token, JWT_SECRET) as { id: string };

            await dbConnect();

            const user = await User.findById(decoded.id).select(['-password']);

            if (!user) {
                throw new HttpException(label.UserNotFound, 404);
            }

            if(user?.role !== siteConfig.UserTypes.admin){
                throw new HttpException(label.DontHavePermissions, 400)
            }

            req.user = user;

            return handler(req, res);

        } catch (error:any) {
            return res.status(error?.statusCode ?? 500).json({
                success: false,
                status: error?.statusCode ?? 500,
                message: error?.message || label.InternalServerError,
            });
        }
    };
};

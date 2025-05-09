import { withMethod } from "@/lib/middlewares/withMethod";
import { NextApiResponse } from "next";
import Label from "@/config/Label";
import owners from "@/config/data.json";
import { HttpException } from "@/utils/HttpException";

async function handler(req: any, res: NextApiResponse) {
    try {
        const { id } = req.query;
        if (!id) {
            throw new HttpException(Label.SomethingWentWrong, 500);
        }

        const owner = owners.find((item) => item.id === id);

        return res.status(200).json({ owner: owner });

    } catch (error: any) {
        return res.status(error?.statusCode ?? 500).json({
            success: false,
            status: error?.statusCode ?? 500,
            message: error?.message || Label.InternalServerError,
        });
    }
}

export default withMethod(handler, ['GET']);

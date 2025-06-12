import { withMethod } from "@/lib/middlewares/withMethod";
import { NextApiResponse } from "next";
import Label from "@/config/Label";
import MineralOwner from "@/lib/mongodb/models/MineralOwner";

async function handler(req: any, res: NextApiResponse) {
    try {
        const { name } = req.query;

        const minerals = await MineralOwner.find({
            counties:{ $elemMatch: { $regex: new RegExp(`^${name}$`, 'i') } }
        })

        return res.status(200).json({
            success:true,
            minerals
        });

    } catch (error: any) {
        return res.status(error?.statusCode ?? 500).json({
            success: false,
            status: error?.statusCode ?? 500,
            message: error?.message || Label.InternalServerError,
        });
    }
}

export default withMethod(handler, ['GET']);

import Label from "@/config/Label";
import { withAuth } from "@/lib/middlewares/withAuth";
import { withCors } from "@/lib/middlewares/withCors";
import { withMethod } from "@/lib/middlewares/withMethod";
import { withRoleAuth } from "@/lib/middlewares/withRoleAuth";
import MineralOwner from "@/lib/mongodb/models/MineralOwner";
import { HttpException } from "@/utils/HttpException";


const handler = async (req: any, res: any) => {
    try {

        const { id } = req.query;
        if (!id?.trim()?.length) {
            throw new HttpException(Label.ParamIdIsReq, 400);
        }

        await MineralOwner.findByIdAndUpdate(id, req.body);

        return res.status(200).send({ success: true })
    } catch (error: any) {
        return res.status(error?.statusCode ?? 500).json({
            message: error?.message,
            success: false,
            status: error?.statusCode ?? 500
        })
    }
};


export default withCors(withAuth(withRoleAuth(withMethod(handler, ['PUT']), ['admin'])));

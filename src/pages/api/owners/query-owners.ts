import { withMethod } from "@/lib/middlewares/withMethod";
import { NextApiResponse } from "next";
import Label from "@/config/Label";
import { dbConnect } from "@/lib/mongodb/dbConnect";
import MineralOwner from "@/lib/mongodb/models/MineralOwner";

async function handler(req: any, res: NextApiResponse) {
    await dbConnect(); // ensure DB is connected

    try {
        const { cityState, name, lName, ml, page = '1', limit = '10' } = req.query;

        const ownerName = typeof name === "string"? name.toLowerCase(): '';
        const ownerCity = typeof cityState === "string" ? cityState.toLowerCase() : '';
        const legalMatch = typeof ml === "string" ? ml.toLowerCase() : '';
        const pageNum = parseInt(page as string, 10);
        const limitNum = parseInt(limit as string, 10);
        const skip = (pageNum - 1) * limitNum;

        // Build MongoDB dynamic filter
        const filter: any = {};
        if (ownerName) {
            filter.name = { $regex: new RegExp(ownerName, 'i') };
        }
        if (ownerCity) {
            filter['state.code'] = { $regex: new RegExp(ownerCity, 'i') };
        }
        // if (legalMatch) {
        //     filter.legal_description = { $regex: new RegExp(legalMatch, 'i') };
        // }

        // Fetch data from MongoDB
        const [owners, totalItems] = await Promise.all([
            MineralOwner.find(filter).skip(skip).limit(limitNum),
            MineralOwner.countDocuments(filter)
        ]);

        return res.status(200).json({
            owners,
            currentPage: pageNum,
            totalItems,
            totalPages: Math.ceil(totalItems / limitNum)
        });

    } catch (error: any) {
        console.log(error)
        return res.status(error?.statusCode ?? 500).json({
            success: false,
            status: error?.statusCode ?? 500,
            message: error?.message || Label.InternalServerError,
        });
    }
}

export default withMethod(handler, ['GET']);

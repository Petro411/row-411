import { withMethod } from "@/lib/middlewares/withMethod";
import { NextApiResponse } from "next";
import Label from "@/config/Label";
import owners from "@/config/data.json";

async function handler(req: any, res: NextApiResponse) {
    try {
        const { cityState, fName, lName, ml, page = '1', limit = '10' } = req.query;

        const ownerName = typeof fName === "string" && typeof lName === "string" ? `${fName} ${lName}`.toLowerCase() : '';
        const ownerCity = typeof cityState === "string" ? cityState.toLowerCase() : '';
        const legalMatch = typeof ml === "string" ? ml.toLowerCase() : '';
        const pageNum = parseInt(page as string, 10);
        const limitNum = parseInt(limit as string, 10);
        const startIndex = (pageNum - 1) * limitNum;
        const endIndex = startIndex + limitNum;

        const filteredOwners = owners.filter(owner => {
            const name = owner?.Name?.toLowerCase() || '';
            const city = owner?.addr_city?.toLowerCase() || '';
            const legal = owner?.legal_description?.toLowerCase() || '';

            return (
                name.includes(ownerName) &&
                city.includes(ownerCity) &&
                legal.includes(legalMatch)
            );
        });

        const paginatedData = filteredOwners.slice(startIndex, endIndex);


        return res.status(200).json({
            owners: paginatedData,
            currentPage: pageNum,
            totalItems: filteredOwners.length,
            totalPages: Math.ceil(filteredOwners.length / limitNum)
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

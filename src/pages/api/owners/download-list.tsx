import { formateListToCSV } from "@/utils/downloadMineralList";
import Subscription from "@/lib/mongodb/models/Subscription";
import MineralOwner from "@/lib/mongodb/models/MineralOwner";
import { withMethod } from "@/lib/middlewares/withMethod";
import { HttpException } from "@/utils/HttpException";
import { dbConnect } from "@/lib/mongodb/dbConnect";
import User from "@/lib/mongodb/models/User";
import { NextResponse } from "next/server";
import { NextApiResponse } from "next";
import Label from "@/config/Label";
import JWT from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET ?? "";

async function handler(req: any, res: NextApiResponse) {
  try {
    const { token, county } = req.query;
    if (!token || !county) {
      throw new HttpException("Unauthorized", 401);
    }

    const decoded = JWT.verify(token, JWT_SECRET) as { id: string };

    await dbConnect();

    const user = await User.findById(decoded.id);

    if (!user) {
      throw new HttpException(Label.UserNotFound, 404);
    }

    const plan = await Subscription.findById(user?.subscription);

    if (!plan) {
      throw new Error(
        "Please purchase a subscription to download the full list"
      );
    }

    // if (plan.expires_at && plan.expires_at < Date.now()) {
    //   throw new Error(
    //     "Your subscription has expired. Please renew to continue."
    //   );
    // }

    // if (plan.totalDownloads >= plan.monthlyDownloadLimit) {
    //   throw new Error(
    //     "You have reached your monthly download limit. Please upgrade or wait for reset."
    //   );
    // }

    const [list, limit] = await Promise.all([
      MineralOwner.find({
        counties: {
          $elemMatch: {
            $regex: new RegExp(
              `^${county?.replace(/\s*county\s*$/i, "").trim()}(\\s*county)?$`,
              "i"
            ),
          },
        },
      }),
      MineralOwner.countDocuments({
        counties: {
          $elemMatch: {
            $regex: new RegExp(
              `^${county?.replace(/\s*county\s*$/i, "").trim()}(\\s*county)?$`,
              "i"
            ),
          },
        },
      }),
    ]);

    plan.totalDownloads = plan.totalDownloads + Number(limit);
    await plan.save();

    // return res.status(200).send({ success: true });

    const csv = formateListToCSV(list);

  //   return new NextResponse(csv, {
  //   status: 200,
  //   headers: {
  //     "Content-Type": "text/csv",
  //     "Content-Disposition": `attachment; filename="list.csv"`,
  //   },
  // });

  return res.status(200).json({csv})

  } catch (error: any) {
    return res.status(error?.statusCode ?? 500).json({
      success: false,
      status: error?.statusCode ?? 500,
      message: error?.message || Label.InternalServerError,
    });
  }
}

export default withMethod(handler, ["GET"]);

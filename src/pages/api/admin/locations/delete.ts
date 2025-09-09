import MineralOwner from "@/lib/mongodb/models/MineralOwner";
import { withMethod } from "@/lib/middlewares/withMethod";
import { withCors } from "@/lib/middlewares/withCors";
import { withAuth } from "@/lib/middlewares/withAuth";
import { HttpException } from "@/utils/HttpException";
import Location from "@/lib/mongodb/models/Location";
import Label from "@/config/Label";


const handler = async (req: any, res: any) => {
  try {
    const { id } = req.query;
    if (!id?.trim()?.length) throw new HttpException(Label.ParamIdIsReq, 400);
    const location = await Location.findById(id);

    if (location?.type === 'state') {
      await MineralOwner.findOneAndDelete({ 'state.code': location.code });
    }

    if (location?.type === 'county') {
      const countyName = location.name.replace(/county/i, '').trim();

      await MineralOwner.deleteMany({
        counties: { $regex: new RegExp(`^${countyName}\\s*(county)?$`, 'i') }
      });
    }

    await Location.findByIdAndDelete(id);
    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res.status(error?.statusCode ?? 500).json({
      message: error?.message,
      success: false,
      status: error?.statusCode ?? 500,
    });
  }
};
export default withCors(withAuth(withMethod(handler, ["DELETE"])));

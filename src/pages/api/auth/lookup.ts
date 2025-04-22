import { withMethod } from "@/lib/middlewares/withMethod";
import { dbConnect } from "@/lib/mongodb/dbConnect";
import User from "@/lib/mongodb/models/User";
import JWT from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? "";

const handler = async (req: any, res: any) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Authorization token missing or malformed." });
    }

    const decoded = JWT.verify(token, JWT_SECRET) as { id: string };

    await dbConnect();

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({ user });
  } catch (error: any) {
    return res.status(error?.statusCode ?? 500).json({
      message: error?.message || "Internal server error",
    });
  }
};

export default withMethod(handler, ['GET']);

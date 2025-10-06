import { withMethod } from "@/lib/middlewares/withMethod";
import { withCors } from "@/lib/middlewares/withCors";
import { withAuth } from "@/lib/middlewares/withAuth";
import { HttpException } from "@/utils/HttpException";
import Contact from "@/lib/mongodb/models/Contact";
import { label } from "@/branding";


async function handler(req: any, res: any) {
 try {
    const {id} = req.query;
    const contact = await Contact.findById(id)
    if(!contact) throw new HttpException(label.NoResultFound,404);
    return res.status(200).json({contact,success:true});
 } catch (error:any) {
     return res.status(error?.statusCode ?? 500).json({
            message: error?.message,
            success: false,
            status: error?.statusCode ?? 500
        })
 }
}
export default withCors(withAuth(withMethod(handler,['GET'])))
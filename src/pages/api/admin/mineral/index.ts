import { withAuth } from "@/lib/middlewares/withAuth";
import { withCors } from "@/lib/middlewares/withCors";
import { withMethod } from "@/lib/middlewares/withMethod"
import MineralOwner from "@/lib/mongodb/models/MineralOwner";

async function handler(req: any, res: any) {
 try {
    const {id} = req.query;
    if(id){
        const mineral = await MineralOwner.findById(id);
        return res.status(200).json({mineral,success:true});
    }else{
        const minerals = await MineralOwner.find({})
        return res.status(200).json({minerals,success:true});
    }
 } catch (error:any) {
     return res.status(error?.statusCode ?? 500).json({
            message: error?.message,
            success: false,
            status: error?.statusCode ?? 500
        })
 }
}
export default withCors(withAuth(withMethod(handler,['GET'])))
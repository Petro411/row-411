import { withMethod } from '@/lib/middlewares/withMethod';
import { HttpException } from '@/utils/HttpException';
import OTP from '@/lib/mongodb/models/OTP';
import { label } from '@/branding';


const handler = async (req: any, res: any) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) throw new HttpException(label.EmailAndOtpReq, 400);

        const record = await OTP.findOne({ email, otp });

        if (!record) {
            throw new HttpException(label.InvalidOrExpiredOTP, 400);
        }

        await OTP.deleteOne({ _id: record._id });

        res.status(200).json({ message: 'OTP verified successfully' });

    } catch (error: any) {
        return res.status(error?.statusCode ?? 500).json({
            success: false,
            status: error?.statusCode ?? 500,
            message: error?.message || label.InternalServerError,
        });
    }
};

export default withMethod(handler, ['POST']);

import Label from '@/config/Label';
import { withMethod } from '@/lib/middlewares/withMethod';
import OTP from '@/lib/mongodb/models/OTP';
import { HttpException } from '@/utils/HttpException';

const handler = async (req: any, res: any) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) throw new HttpException(Label.EmailAndOtpReq, 400);

        const record = await OTP.findOne({ email, otp });

        if (!record) {
            throw new HttpException(Label.InvalidOrExpiredOTP, 400);
        }

        await OTP.deleteOne({ _id: record._id });

        res.status(200).json({ message: 'OTP verified successfully' });

    } catch (error: any) {
        return res.status(error?.statusCode ?? 500).json({
            success: false,
            status: error?.statusCode ?? 500,
            message: error?.message || Label.InternalServerError,
        });
    }
};

export default withMethod(handler, ['POST']);

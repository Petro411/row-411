import { getTemplate } from '@/lib/nodemailer/get-template';
import { withMethod } from '@/lib/middlewares/withMethod';
import { transporter } from '@/lib/nodemailer/transport';
import { HttpException } from '@/utils/HttpException';
import OTP from '@/lib/mongodb/models/OTP';
import { label } from '@/branding';
import crypto from 'crypto';


const generateSecureOTP = (): string => {
  return (crypto.randomInt(1000, 10000)).toString();
};

const handler = async (req: any, res: any) => {
    try {
        const { email } = req.body;

        if (!email) throw new HttpException(label.EmailPasswordReq, 400);

        const existingOtps = await OTP.find({email});

        if(existingOtps.length >= 4){
            throw new HttpException(label.TooManyAttempts,400)
        }

        const otp = generateSecureOTP()

        await OTP.create({ email, otp });

        await transporter.sendMail({
            to: email,
            subject: 'Verification Code',
            // text:`Your verification code is ${otp}`
            html: getTemplate('otp', otp),
        });

        res.status(200).json({ message: label.OtpSentToEmail });
    } catch (error: any) {
        return res.status(error?.statusCode ?? 500).json({
            success: false,
            status: error?.statusCode ?? 500,
            message: error?.message || label.InternalServerError,
        });
    }

};

export default withMethod(handler, ['POST']);

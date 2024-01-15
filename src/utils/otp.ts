import nodeMailer from 'nodemailer';
import 'dotenv/config';

type OTP = {
    code: number;
    expiry: number;
};

const EXPIRY_DURATION = 30 * 60 * 1000;
const DIGIT = 6;

export const generateOTP = (digitCount: number = DIGIT, duration: number = EXPIRY_DURATION) =>
{
    const otpCode = Math.floor(Math.random() * 10 ** digitCount);
    const expiry = new Date().getTime() + duration;
    return { otpCode, expiry };
};

export const isExpired = (otp: OTP) => otp.expiry < new Date().getTime();

export const sendOTPEmail = async (email: string, otp: number) =>
{
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SENDER_MAIL,
            pass: process.env.SENDER_PASS
        }
    });

    const mailOptions = {
        from: process.env.SENDER_MAIL,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}`
    };

    await transporter.sendMail(mailOptions);
};


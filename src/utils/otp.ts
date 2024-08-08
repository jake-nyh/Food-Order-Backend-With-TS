import nodeMailer from 'nodemailer';
import 'dotenv/config';
import twilio from 'twilio';

type OTP = {
    code: number;
    expiry: number;
};

const EXPIRY_DURATION = 30 * 60 * 1000;
const DIGIT = 6;

export const generateOTP = (digitCount: number = DIGIT, duration: number = EXPIRY_DURATION) =>
{
    const otpCode = Math.floor(Math.random() * 10 ** digitCount);
    const otp_expiry = new Date().getTime() + duration;
    return { otpCode, otp_expiry };
};

export const validateOTP = (otp: string, customerOtp: any, customerOtpExpiry: number)=>{
    return parseInt(otp) === customerOtp && customerOtpExpiry >= new Date().getTime()
}

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

export const sendOTPwithSMS = (otp:number, phoneNumber:string)=>{
    const accountSID = process.env.TWILLIO_ACC_SID;
    const authToken = process.env.TWILLIO_AUTH_TOKEN;
    const client = twilio(accountSID, authToken);

    const response = client.messages.create({
        body: `Your OTP code is ${otp}`,
        to: phoneNumber,
        from: '+17063974621'
    })

    console.log(response)
    
    return response;
}





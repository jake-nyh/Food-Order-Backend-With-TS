import sendToken from "../utils/jwtToken";
import ApiError from "../utils/apiError";
import { Request, Response, NextFunction } from "express";
import customerModel from "../models/customerModel";
import asyncHandler from "../utils/catchAsync";
import { generateOTP, sendOTPEmail } from "../utils/otp";

interface ICustomerRegisterInput{
  username: string;
  email: string;
  password: string;
  address: string;
  phone: string
}

interface ICustomerLoginInput{
  email : string;
  password: string;
}

export const customerRegister = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) =>
  {
    const { username, email, password, address, phone } = <ICustomerRegisterInput>req.body;
    const customer = await customerModel.findOne({ email });
    if (customer)
    {
      return next(
        new ApiError("the vendor with this email exits", 500)
      );
    }

    const { otpCode, expiry } = generateOTP();

    const newCustomer = await customerModel.create({
      username,
      email,
      password,
      address,
      phone,
      otpCode,
      otp_expiry: expiry,
    });

    const result = await newCustomer.save();

    await sendOTPEmail(email,otpCode)

    res.status(201).json({
      success: true,
      result
    });

  }
);

export const customerLogin = asyncHandler(async (req: Request, res: Response, next: NextFunction) =>
{
  const { email, password } = <ICustomerLoginInput>req.body;
  const customer = await customerModel.findOne({ email });
  if (!customer)
  {
    return next(
      new ApiError("the vendor with this email does not exit", 500)
    );
  }
  const isPasswordMatched = await customer.comparePassword(password);
  if (!isPasswordMatched)
  {
    return next(new ApiError("wrong password", 500));
  }
  sendToken(customer, res);
});

export const requestOTP = async (req: Request, res: Response) =>
{
  const user = req.user;
  const {otp} = req.body;



  
};

export const getCustomerProfile = async (req: Request, res: Response) =>
{
  

};

export const updateCustomerProfile = async (req: Request, res: Response) =>
{

};





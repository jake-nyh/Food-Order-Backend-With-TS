import sendToken from "../utils/jwtToken";
import ApiError from "../utils/apiError";
import { Request, Response, NextFunction } from "express";
import customerModel from "../models/customerModel";
import asyncHandler from "../utils/catchAsync";
import { generateOTP, sendOTPEmail, sendOTPwithSMS, validateOTP } from "../utils/otp";

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
        new ApiError("the customer with this email exits", 500)
      );
    }

    const { otpCode, otp_expiry } = generateOTP();

    const newCustomer = await customerModel.create({
      username,
      email,
      password,
      address,
      phone,
      otpCode,
      otp_expiry,
    });

    const result = await newCustomer.save();

    await sendOTPEmail(email,otpCode)

    // await sendOTPwithSMS(otpCode, phone)

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

export const customerVerify = asyncHandler(async (req: Request, res: Response, next: NextFunction) =>
  {
    const { otp } = req.body;
    const user = req.user;

    if (user){

      const customer = await customerModel.findById(user._id)

      if(customer){

        if (validateOTP(otp, customer.otpCode, customer.otp_expiry)){

          customer.isVerified = true;

          const updatedCustomer = await customer.save()

          return res.status(200).json({
            success: true,
            email: updatedCustomer.email,
            isVerified: updatedCustomer.isVerified
          })

        }
      }
    }

   return next(new ApiError("otp validation failed", 403))

  });

export const requestOTP = asyncHandler(async (req: Request, res: Response, next: NextFunction) =>
{
  const user = req.user;

  let customer = await customerModel.findById(user?._id)
  const { otpCode, otp_expiry } = generateOTP();
  if(!customer){
    return next(new ApiError("customer not found", 404));
  }
  customer.otpCode = otpCode
  customer.otp_expiry = otp_expiry

  const updatedCustomer = await customer.save()
  await sendOTPEmail(customer.email,customer.otpCode)

  return res.status(200).json({
    success: true,
    email: updatedCustomer.email,
    otpCode: updatedCustomer.otpCode,
    otp_expiry: updatedCustomer.otp_expiry
  });

});

export const getCustomerProfile = asyncHandler(async (req: Request, res: Response, next: NextFunction) =>
{
    const user = req.user;
    
    if(!user){
      return next(new ApiError("no user found",404))
    }

    const customer = await customerModel.findById(user.id)

    if(!customer){
      return next(new ApiError("no customer found",404))
    }

    return res.status(200).json(customer)
});

export const updateCustomerProfile = asyncHandler(async (req: Request, res: Response, next: NextFunction) =>
{
   const {username, address} = req.body;
   const user = req.user;

   if (!user){
    return next(new ApiError("no user found",404))
   }

   const customer = await customerModel.findById(user.id)

   if (!customer){
    return next(new ApiError("no customer found", 404))
   }

   customer.username = username;
   customer.address = address;

   const updatedCustomer = await customer.save();

   return res.status(200).json({
    success: true,
    username: updatedCustomer.username,
    address: updatedCustomer.address
   })
});





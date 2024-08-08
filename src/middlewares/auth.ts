import ApiError from "../utils/apiError";
import asyncHandler from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import vendorModel, { Vendor } from "../models/vendorModel";
import jwt, { JwtPayload } from "jsonwebtoken";
import customerModel, { Customer } from "../models/customerModel";

declare global {
  namespace Express {
    interface Request {
      user?: Vendor|Customer;
    }
  }
}


const isAuthorized = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader =req.headers["authorization"];
    const split = authHeader && authHeader.split(" ")
    const accessToken =  split && split[1]

    if (!accessToken) {
      return next(new ApiError("please login to get this resource", 400));
    }

    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SEC as string
    ) as JwtPayload;
    if (!decoded) {
      return next(new ApiError("the access token is not valid", 400));
    }

    // let user = await vendorModel.findById(decoded.id);
    // if (user) {
    //   req.user = user; 
    // }else{
    //   user = await customerModel.findById(decoded.id)
    //   if(user){
    //     req.user = user;         
    //   }else{
    //     return next(new ApiError("user is not found", 404));
    //   }
    // }
    // next()

    const [customer , vendor] = await Promise.all([
      vendorModel.findById(decoded.id),
      customerModel.findById(decoded.id)
    ])
   
    const user = customer || vendor

    if (!user){
      return next(new ApiError("user not found",404))
    }

    req.user = user;
    next()
  }
);

export default isAuthorized;


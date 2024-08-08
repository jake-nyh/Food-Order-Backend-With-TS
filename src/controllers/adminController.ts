import logger from "../utils/logger";
import vendorModel from "../models/vendorModel";
import asyncHandler from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError";

interface ICreateVendorInput{
  name: string;
  ownerName: string;
  foodType: string;
  pincode: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  serviceAvaliable: boolean;
  coverImages: [];
  rating: string
}

export const createVendor = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      name,
      ownerName,
      foodType,
      pincode,
      address,
      phone,
      email,
      password,
      serviceAvaliable,
      coverImages,
      rating,
    } = <ICreateVendorInput>req.body;

    const existingVendor = await vendorModel.findOne({ email });
    if (existingVendor) {
      return next(new ApiError("the vendor with this email exists", 500));
    }

    const newVendor = await vendorModel.create({
      name,
      ownerName,
      foodType,
      pincode,
      address,
      phone,
      email,
      password,
      serviceAvaliable,
      coverImages,
      rating,
    });

    res.status(201).json(newVendor);
  }
);

export const getAllVendors = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const vendors = await vendorModel.find();
    res.status(200).json(vendors);
  }
);

export const getVendorById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const vendor = await vendorModel.findById(id);
    if(!vendor){
       return next(new ApiError("the vendor with this id is not found",500))
    }
    res.status(200).json(vendor)
  }
);

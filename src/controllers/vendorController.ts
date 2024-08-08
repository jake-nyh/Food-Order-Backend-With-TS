import vendorModel from "../models/vendorModel";
import asyncHandler from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError";
import logger from "../utils/logger";
import sendToken from "../utils/jwtToken";
import foodModel, { Food } from "../models/foodModel";

interface IVendorLoginInput{
  email : string;
  password: string;
}

export const vendorLogin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) =>
  {
    const { email, password } = <IVendorLoginInput>req.body;
    const vendor = await vendorModel.findOne({ email });
    if (!vendor)
    {
      return next(
        new ApiError("the vendor with this email does not exit", 500)
      );
    }
    const isPasswordMatched = await vendor.comparePassword(password);
    if (!isPasswordMatched)
    {
      return next(new ApiError("wrong password", 500));
    }
    sendToken(vendor, res);
  }
);

export const getVendorProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) =>
  {
    const user = req.user;
    if (!user)
    {
      return next(new ApiError("Vendor information was not found", 404));
    }
    const existingVendor = await vendorModel.findById(user._id);
    res.status(200).json({
      success: true,
      existingVendor,
    });
  }
);

export const updateVendorProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) =>
  {
    const { name, ownerName, address, phone, foodType } = req.body;

    const user = req.user;
    if (!user)
    {
      return next(new ApiError("Vendor information was not found", 404));
    }

    const updatedProfile = await vendorModel.findByIdAndUpdate(
      user._id,
      {
        name: name,
        ownerName: ownerName,
        address: address,
        phone: phone,
        foodType: foodType,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProfile)
      return next(new ApiError("No Vendor found with that ID", 404));

    res.status(200).json({
      status: "success",
      data: updatedProfile,
    });
  }
);

export const updateCoverImage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) =>
  {

    const user = req.user;
    const files = req.files as any;
    console.log(files)

    const images = files.map((file: any) => file.filename);

    if (!user)
    {
      return next(new ApiError("Vendor was not found", 404));
    }

    const vendor = await vendorModel.findById(user._id);
    if (!vendor)
    {
      return next(new ApiError("Vendor was not found", 404));
    }
    vendor.coverImages.push(...images);

    const result = await vendor.save();
    res.status(201).json({
      status: "success",
      result
    });
  }
);

export const updateVendorService = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) =>
  {
    const { serviceAvaliable } = req.body;

    const user = req.user;
    if (!user)
    {
      return next(new ApiError("Vendor information was not found", 404));
    }

    const updatedService = await vendorModel.findByIdAndUpdate(
      user._id,
      {
        serviceAvaliable: serviceAvaliable,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedService)
      return next(new ApiError("No Vendor found with that ID", 404));

    res.status(200).json({
      status: "success",
      data: updatedService,
    });
  }
);

export const addFoods = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) =>
  {
    const { name, description, category, foodType, readyTime, price, rating } =
      req.body;

    const user = req.user;
    const files = req.files as any;
    const images = files?.map((file: any) => file.filename);

    if (!user)
    {
      return next(new ApiError("Vendor was not found", 404));
    }

    const vendor = await vendorModel.findById(user._id);
    if (vendor)
    {
      const newFood = await foodModel.create({
        vendorId: user._id,
        name,
        description,
        category,
        foodType,
        readyTime,
        price,
        rating,
        images: images
      });

      vendor?.foods.push(newFood);
      const result = await vendor.save();
      res.status(201).json({
        status: "success",
        result,
      });
    }
  }
);

export const getFoods = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) =>
  {
    const user = req.user;
    if (!user)
    {
      return next(new ApiError("Vendor was not found", 404));
    }
    const foods = await foodModel.find({ vendorId: user._id });
    if (!foods)
    {
      return next(new ApiError("this vendor have no foods", 404));
    }
    res.status(200).json(foods);
  }
);

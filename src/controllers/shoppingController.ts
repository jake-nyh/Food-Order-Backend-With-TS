import asyncHandler from "../utils/catchAsync";
import { Request, Response } from "express";
import vendorModel from "../models/vendorModel";
import foodModel from "../models/foodModel";

export const getFoodAvaliablity = asyncHandler(
    async (req: Request, res: Response) =>
    {
        const { pincode } = req.params;

        const result = await vendorModel.find({ pincode: pincode, serviceAvaliable: false })
            .sort({ rating: -1 })
            .populate("foods");

        if (result.length > 0)
        {
            return res.status(200).json(result);
        }

        return res.status(404).json({ message: "Data not found" });
    });

export const getTopResturants = asyncHandler(
    async (req: Request, res: Response) =>
    {
        const { pincode } = req.params;

        const result = await vendorModel.find({ pincode: pincode, serviceAvaliable: false })
            .sort({ rating: -1 })
            .limit(5);

        if (result.length > 0)
        {
            return res.status(200).json(result);
        }

        return res.status(404).json({ message: "Data not found" });
    });

export const getFoodAvaliableIn30Minutes = asyncHandler(
    async (req: Request, res: Response) =>
    {
        const { pincode } = req.params;

        const result = await foodModel.aggregate([
            {
                $match: {
                    readyTime: {
                        $lte: 30,
                    },
                },
            },
            {
                $lookup: {
                    from: 'vendors',
                    localField: 'vendorId',
                    foreignField: '_id',
                    as: 'vendor',
                },
            },
            {
                $unwind: {
                    path: '$vendor',
                },
            },
            {
                $match: {
                    $and: [
                        { 'vendor.pinCode': pincode },
                        {
                            'vendor.serviceAvailable': {
                                $eq: false,
                            },
                        },
                    ],
                },
            },
        ]);

        console.log(result);

        if (result.length > 0)
        {
            return res.status(200).json(result);
        }

        return res.status(404).json({ message: "Data was not foung" });

    });

export const SearchFoods = asyncHandler(
    async (req: Request, res: Response) =>
    {

    });

export const getResturantByID = asyncHandler(
    async (req: Request, res: Response) =>
    {

    });

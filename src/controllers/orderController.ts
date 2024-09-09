import { Request, NextFunction, Response } from "express";
import asyncHandler from "../utils/catchAsync";
import ApiError from "../utils/apiError";
import customerModel from "models/customerModel";
import { generateOrderId } from "utils/order";
import orderModel from "models/orderModel";

export const createOrder = asyncHandler(async(req: Request , res: Response, next: NextFunction)=>{
    const user = req.user;

    const cart = req.body; 

    if(!user){
        return next(new ApiError("no user found", 404))
    }

    const customer = await customerModel.findById(user.id)

    if(!user){
        return next(new ApiError("no customer found", 404))
    }

    const orderId = generateOrderId()

    

})

export const getAllOrders = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
    // const user = req.user;

    const query = req.query

    const orders = await orderModel.find(query)

    

    
    
})

export const getOrdersById = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
    
})

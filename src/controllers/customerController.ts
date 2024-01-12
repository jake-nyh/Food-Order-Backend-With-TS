import sendToken from "../utils/jwtToken";
import ApiError from "../utils/apiError";
import { Request, Response, NextFunction } from "express";
import customerModel from "../models/customerModel";
import asyncHandler from "../utils/catchAsync";
import { generateOTP } from "../utils/otp";
import { existsSync } from 'fs';
import fs from 'fs/promises'
import { compressFile } from "../utils/compressPDF";
import zlib from 'zlib';
import { PdfDocument } from "@ironsoftware/ironpdf";
import pdfjs from 'pdfjs-dist'  
import { promisify } from "util";
import path from "path";
import { exec } from "child_process";


export const customerRegister = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) =>
  {
    const { username, email, password, address, phone } = req.body;
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

    res.json(201).json({
      success: true,
      result
    });

  }
);

export const customerLogin = asyncHandler(async (req: Request, res: Response, next: NextFunction) =>
{
  const { email, password } = req.body;
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
  console.log(user);
};

export const getCustomerProfile = async (req: Request, res: Response) =>
{

};

export const updateCustomerProfile = async (req: Request, res: Response) =>
{

};

export const uploadPDF = async (req: Request, res: Response) =>
{
  
  
  // if (file?.path)
  // {
  //   const inputFilePath = file.path;
  //   const outputFilePath = file.path;

  //   const pdfBuffer = fs.readFileSync(inputFilePath);
  //   console.log(pdfBuffer)

  //   zlib.deflate(pdfBuffer, async (err, compressedBuffer) =>
  //   {
  //     if (err)
  //     {
  //       console.error('Compression error:', err);
  //       return;
  //     }
  //     fs.writeFileSync(outputFilePath, compressedBuffer);
  //     console.log(compressedBuffer)
  //     res.status(200).send('PDF compression  successful!');
  //   })
  // }

 const file = req.file
 console.log(file)
 if(file){
  await compressedPDF(file)
  console.log(file)
  res.send("completed")
 }
}
 
const compressedPDF = (async (file: any) => {
  
    // Load the existing PDF document
    const pdf = await PdfDocument.fromFile(file.path);
 
    // Compress images with quality parameter (1-100)
    await pdf.compressSize(60);
    // Save the compressed PDF
    await pdf.saveAs("document_compressed.pdf");
 
    // Compress images and scale down based on visible size in the PDF document
    await pdf.compressSize(90, true);
    // Save the scaled and compressed PDF
    await pdf.saveAs("document_scaled_compressed.pdf");

    return pdf
})
  









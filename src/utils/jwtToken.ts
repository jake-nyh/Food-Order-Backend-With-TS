import { Response } from "express";
import { Vendor } from "../models/vendorModel";
import { Customer } from "../models/customerModel";

interface TokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "strict" | "lax" | "none" | undefined;
  secure?: boolean;
}

const sendToken = (user: Vendor| Customer, res: Response) => {
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  const accessTokenExpirationDate = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000
  );
  const refreshTokenExpirationDate = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000
  );

  const accessTokenOptions: TokenOptions = {
    expires: accessTokenExpirationDate,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
    secure: true,
  };

  const refreshTokenOptions: TokenOptions = {
    expires: refreshTokenExpirationDate,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
    secure: true,
  };

  res.cookie("accessToken", accessToken, accessTokenOptions);
  res.cookie("refreshToken", refreshToken, refreshTokenOptions);

  res.status(200).json({
    success: true,
    user,
    accessToken,
  });
  
};

export default sendToken;

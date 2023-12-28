import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Food } from "./foodModel";
import 'dotenv/config';

const emailRegexPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export interface Vendor extends Document
{
  name: string;
  ownerName: string;
  foodType: string;
  pincode: string;
  address: string;
  phone: number;
  email: string;
  password: string;
  serviceAvaliable: boolean;
  coverImages: [string];
  rating: number;
  foods: Food[];
  comparePassword: (password: string) => Promise<boolean>;
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
}

const vendorSchema: Schema<Vendor> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the name"],
    },
    ownerName: {
      type: String,
      required: [true, "Please enter the owner name"],
    },
    foodType: [
      {
        type: String,
      },
    ],
    pincode: {
      type: String,
      required: [true, "Please enter the pincode"],
    },
    address: {
      type: String,
    },
    phone: {
      type: Number,
      required: [true, "Please enter the phone number"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      validate: {
        validator: function (email: string)
        {
          return emailRegexPattern.test(email);
        },
        message: "Please enter the valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [6, "Password must be at least 6 characters"],
      select: true,
    },
    coverImages: [{
      type: String
    }],
    rating: {
      type: Number,
    },
    serviceAvaliable: {
      type: Boolean,
    },
    foods: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "food",
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret)
      {
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

//hash password before saving
vendorSchema.pre<Vendor>("save", async function (next)
{
  try
  {
    if (!this.isModified("password"))
    {
      next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err: any)
  {
    next(err);
  }
});

//compare password
vendorSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean>
{
  return await bcrypt.compare(enteredPassword, this.password);
};

//generate access token
vendorSchema.methods.generateAccessToken = function ()
{
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.ACCESS_TOKEN_SEC as string,
    {
      expiresIn: "1d",
    }
  );
};

//generate refresh token
vendorSchema.methods.generateRefreshToken = function ()
{
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.REFRESH_TOKEN_SEC as string,
    {
      expiresIn: "1d",
    }
  );
};

const vendorModel: Model<Vendor> = mongoose.model("Vendor", vendorSchema);

export default vendorModel;

import mongoose, { Date, Document, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const emailRegexPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export interface Customer extends Document {
  username: string;
  email: string;
  password: string;
  address: string;
  phone: number;
  isVerified: boolean;
  otpCode: number;
  otp_expiry: Number;
  lat: number;
  lng: number;
  comparePassword: (password: string) => Promise<boolean>;
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
}

const customerSchema = new mongoose.Schema<Customer>(
  {
    username: {
      type: String,
      required: [true, "Please enter your name"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [6, "Password must be at least 6 characters"],
      select: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      validate: {
        validator: function (email: string) {
          return emailRegexPattern.test(email);
        },
        message: "Please enter the valid email",
      },
    },
    address: {
     type: String
    },
    phone: {
      type: Number,
      required: true
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otpCode: {
      type: Number,
      required: true
    },
    otp_expiry: {
      type: Date,
      required: true
    },
    lat: {
      type: Number
    },
    lng: {
      type: Number
    }
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
customerSchema.pre<Customer>("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err: any) {
    next(err);
  }
});

//compare password
customerSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

customerSchema.methods.generateAccessToken = function ()
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

customerSchema.methods.generateRefreshToken = function ()
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

const customerModel: Model<Customer> = mongoose.model("Customer", customerSchema);

export default customerModel;

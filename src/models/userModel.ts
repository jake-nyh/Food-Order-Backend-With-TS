import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const emailRegexPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  courses: Array<{ courseId: string }>;
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<User>(
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
    avatar: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    courses: [
      {
        courseId: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

//hash password before saving
userSchema.pre<User>("save", async function (next) {
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
userSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const userModel: Model<User> = mongoose.model("User", userSchema);

export default userModel;

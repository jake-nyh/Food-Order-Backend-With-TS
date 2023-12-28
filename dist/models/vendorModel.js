"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const emailRegexPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const vendorSchema = new mongoose_1.default.Schema({
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
            validator: function (email) {
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
    coverImages: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    rating: {
        type: Number,
    },
    serviceAvaliable: {
        type: Boolean,
    },
    foods: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "food",
        },
    ],
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.createdAt;
            delete ret.updatedAt;
            delete ret.__v;
        },
    },
    timestamps: true,
});
vendorSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!this.isModified("password")) {
                next();
            }
            this.password = yield bcrypt_1.default.hash(this.password, 10);
            next();
        }
        catch (err) {
            next(err);
        }
    });
});
vendorSchema.methods.comparePassword = function (enteredPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(enteredPassword, this.password);
    });
};
vendorSchema.methods.generateAccessToken = function () {
    return jsonwebtoken_1.default.sign({
        id: this._id,
    }, process.env.ACCESS_TOKEN_SEC, {
        expiresIn: "1d",
    });
};
vendorSchema.methods.generateRefreshToken = function () {
    return jsonwebtoken_1.default.sign({
        id: this._id,
    }, process.env.REFRESH_TOKEN_SEC, {
        expiresIn: "1d",
    });
};
const vendorModel = mongoose_1.default.model("Vendor", vendorSchema);
exports.default = vendorModel;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const foodSchema = new mongoose_1.default.Schema({
    vendorId: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
    },
    foodType: {
        type: String,
        required: true,
    },
    readyTime: {
        type: Number,
    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
    },
    images: [
        {
            type: String,
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
const foodModel = mongoose_1.default.model("Food", foodSchema);
exports.default = foodModel;

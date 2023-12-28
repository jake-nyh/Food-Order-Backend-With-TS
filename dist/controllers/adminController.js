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
exports.getVendorById = exports.getAllVendors = exports.createVendor = void 0;
const vendorModel_1 = __importDefault(require("../models/vendorModel"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const apiError_1 = __importDefault(require("../utils/apiError"));
exports.createVendor = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, ownerName, foodType, pincode, address, phone, email, password, serviceAvaliable, coverImages, rating, } = req.body;
    const existingVendor = yield vendorModel_1.default.findOne({ email });
    if (existingVendor) {
        return next(new apiError_1.default("this vendor exists", 500));
    }
    const newVendor = yield vendorModel_1.default.create({
        name,
        ownerName,
        foodType,
        pincode,
        address,
        phone,
        email,
        password,
        serviceAvaliable,
        coverImages,
        rating,
    });
    res.status(201).json(newVendor);
}));
exports.getAllVendors = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const vendors = yield vendorModel_1.default.find();
    res.status(200).json(vendors);
}));
exports.getVendorById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const vendor = yield vendorModel_1.default.findById(id);
    if (!vendor) {
        return next(new apiError_1.default("the vendor with this id is not found", 500));
    }
    res.status(200).json(vendor);
}));

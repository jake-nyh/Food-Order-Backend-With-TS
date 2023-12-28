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
exports.getFoods = exports.addFoods = exports.updateVendorService = exports.updateCoverImage = exports.updateVendorProfile = exports.getVendorProfile = exports.vendorLogin = void 0;
const vendorModel_1 = __importDefault(require("../models/vendorModel"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const apiError_1 = __importDefault(require("../utils/apiError"));
const jwtToken_1 = __importDefault(require("../utils/jwtToken"));
const foodModel_1 = __importDefault(require("../models/foodModel"));
exports.vendorLogin = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const vendor = yield vendorModel_1.default.findOne({ email });
    if (!vendor) {
        return next(new apiError_1.default("the vendor with this email does not exit", 500));
    }
    const isPasswordMatched = yield vendor.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new apiError_1.default("wrong password", 500));
    }
    (0, jwtToken_1.default)(vendor, res);
}));
exports.getVendorProfile = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        return next(new apiError_1.default("Vendor information was not found", 404));
    }
    const existingVendor = yield vendorModel_1.default.findById(user._id);
    res.status(200).json({
        success: true,
        existingVendor,
    });
}));
exports.updateVendorProfile = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, ownerName, address, phone, foodType } = req.body;
    const user = req.user;
    if (!user) {
        return next(new apiError_1.default("Vendor information was not found", 404));
    }
    const updatedProfile = yield vendorModel_1.default.findByIdAndUpdate(user._id, {
        name: name,
        ownerName: ownerName,
        address: address,
        phone: phone,
        foodType: foodType,
    }, {
        new: true,
        runValidators: true,
    });
    if (!updatedProfile)
        return next(new apiError_1.default("No Vendor found with that ID", 404));
    res.status(200).json({
        status: "success",
        data: updatedProfile,
    });
}));
exports.updateCoverImage = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        return next(new apiError_1.default("Vendor was not found", 404));
    }
    const vendor = yield vendorModel_1.default.findById(user._id);
    if (vendor) {
        if (!user) {
            return next(new apiError_1.default("Vendor was not found", 404));
        }
        const vendor = yield vendorModel_1.default.findById(user._id);
        if (vendor) {
            console.log('lee');
        }
    }
}));
exports.updateVendorService = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceAvaliable } = req.body;
    const user = req.user;
    if (!user) {
        return next(new apiError_1.default("Vendor information was not found", 404));
    }
    const updatedService = yield vendorModel_1.default.findByIdAndUpdate(user._id, {
        serviceAvaliable: serviceAvaliable,
    }, {
        new: true,
        runValidators: true,
    });
    if (!updatedService)
        return next(new apiError_1.default("No Vendor found with that ID", 404));
    res.status(200).json({
        status: "success",
        data: updatedService,
    });
}));
exports.addFoods = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, category, foodType, readyTime, price, rating } = req.body;
    const user = req.user;
    const files = req.files;
    const images = files === null || files === void 0 ? void 0 : files.map((file) => file.name);
    if (!user) {
        return next(new apiError_1.default("Vendor was not found", 404));
    }
    const vendor = yield vendorModel_1.default.findById(user._id);
    if (vendor) {
        const newFood = yield foodModel_1.default.create({
            vendorId: user._id,
            name,
            description,
            category,
            foodType,
            readyTime,
            price,
            rating,
            images
        });
        vendor === null || vendor === void 0 ? void 0 : vendor.foods.push(newFood);
        const result = yield vendor.save();
        res.status(201).json({
            status: "success",
            result,
        });
    }
}));
exports.getFoods = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        return next(new apiError_1.default("Vendor was not found", 404));
    }
    const foods = yield foodModel_1.default.find({ vendorId: user._id });
    if (!foods) {
        return next(new apiError_1.default("this vendor have no foods", 404));
    }
    res.status(200).json(foods);
}));

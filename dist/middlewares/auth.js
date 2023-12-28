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
const apiError_1 = __importDefault(require("../utils/apiError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const vendorModel_1 = __importDefault(require("../models/vendorModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuthorized = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { accessToken } = req.cookies;
    if (!accessToken) {
        return next(new apiError_1.default("please login to get this resource", 400));
    }
    const decoded = jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_TOKEN_SEC);
    if (!decoded) {
        return next(new apiError_1.default("the access token is not valid", 400));
    }
    const user = yield vendorModel_1.default.findById(decoded.id);
    if (!user) {
        return next(new apiError_1.default("user is not found", 404));
    }
    req.user = user;
    next();
}));
exports.default = isAuthorized;

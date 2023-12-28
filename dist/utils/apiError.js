"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(massage, statusCode) {
        super(massage);
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
    static badRequest(msg) {
        return new ApiError(msg, 400);
    }
    static notFound(msg) {
        return new ApiError(msg, 404);
    }
    static internalError(msg) {
        return new ApiError(msg, 500);
    }
}
exports.default = ApiError;

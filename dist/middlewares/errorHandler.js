"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    return res.status(err.statusCode).json({
        status: err === null || err === void 0 ? void 0 : err.status,
        massage: err === null || err === void 0 ? void 0 : err.message,
        stack: err === null || err === void 0 ? void 0 : err.stack
    });
};
exports.default = errorHandler;

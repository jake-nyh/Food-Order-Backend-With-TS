"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const adminRoute_1 = require("./routes/adminRoute");
const vendorRoute_1 = require("./routes/vendorRoute");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: "50mb" }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.ORIGIN,
}));
app.use("/images", express_1.default.static(path_1.default.join(__dirname, "images")));
app.use("/api/admin", adminRoute_1.adminRouter);
app.use("/api/vendor", vendorRoute_1.vendorRouter);
app.get("/", (req, res, next) => {
    res.send("min may ngar loe 2029");
});
app.use(errorHandler_1.default);
app.all("*", (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} was not found`);
    err.statusCode = 404;
    next(err);
});
exports.default = app;

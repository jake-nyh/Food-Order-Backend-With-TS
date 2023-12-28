"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const adminController_1 = require("../controllers/adminController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.adminRouter = router;
router.get("/test", (req, res, next) => {
    res.status(200).json({ massage: "lee pal ya mal from vendor" });
});
router.post("/vendor", adminController_1.createVendor);
router.get("/vendor", adminController_1.getAllVendors);
router.get("/vendor/:id", adminController_1.getVendorById);

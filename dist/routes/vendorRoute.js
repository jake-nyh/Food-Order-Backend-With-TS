"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorRouter = void 0;
const auth_1 = __importDefault(require("../middlewares/auth"));
const vendorController_1 = require("../controllers/vendorController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.vendorRouter = router;
router.get("/test", (req, res, next) => {
    res.status(200).json({ massage: "lee pal ya mal from vendor" });
});
router.post("/", vendorController_1.vendorLogin);
router.get("/profile", auth_1.default, vendorController_1.getVendorProfile);
router.patch("/profile", auth_1.default, vendorController_1.updateVendorProfile);
router.patch("/coverImage", auth_1.default, vendorController_1.updateCoverImage);
router.patch("/service", auth_1.default, vendorController_1.updateVendorService);
router.post("/foods", auth_1.default, vendorController_1.addFoods);
router.get("/foods", auth_1.default, vendorController_1.getFoods);

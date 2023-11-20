import {
  createVendor,
  getAllVendors,
  getVendorById,
} from "../controllers/adminController";
import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

router.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ massage: "lee pal ya mal from vendor" });
});

router.post("/vendor", createVendor);

router.get("/vendor", getAllVendors);

router.get("/vendor/:id", getVendorById);

export { router as adminRouter };

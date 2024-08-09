import {
  createVendor,
  getAllVendors,
  getVendorById,
} from "../controllers/adminController";
import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

router.post("/vendor", createVendor);

router.get("/vendor", getAllVendors);

router.get("/vendor/:id", getVendorById);

export { router as adminRouter };

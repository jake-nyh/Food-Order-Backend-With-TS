import isAuthorized from "../middlewares/auth";
import {
  vendorLogin,
  getVendorProfile,
  updateCoverImage,
  updateVendorService,
  addFoods,
  getFoods,
  updateVendorProfile,
} from "../controllers/vendorController";
import express, { Request, Response, NextFunction } from "express";
import uploadImage from "../middlewares/multer";

const router = express.Router();

router.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ massage: "lee pal ya mal from vendor" });
});

router.post("/", vendorLogin);
router.get("/profile", isAuthorized, getVendorProfile);
router.patch("/profile", isAuthorized, updateVendorProfile)
router.patch("/coverImage", isAuthorized, uploadImage.array('images',5), updateCoverImage);
router.patch("/service", isAuthorized, updateVendorService);
router.post("/foods", isAuthorized,uploadImage.array('images', 5), addFoods);
router.get("/foods", isAuthorized, getFoods);

export { router as vendorRouter };

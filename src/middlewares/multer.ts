import ApiError from "../utils/apiError";
import { Request } from "express";
import multer, { Multer } from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) =>
  {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: (req, file, cb) =>
  {
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.originalname}`);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: any) =>
{
  const extension = path.extname(file.originalname);
  const allowableExtensions = [
    '.png',
    '.jpg',
    '.jpeg',
    '.pdf',
    '.docx',
    '.doc',
  ];

  const normalizedExtension = extension.toLowerCase();

  if (allowableExtensions.includes(normalizedExtension))
  {
    cb(null, true);
  } else
  {
    cb(
      new ApiError(
        'Only allowed PNG, JPG, JPEG, PDF, DOCX, DOC extensions. Please try again',
        400
      ),
      false
    );
  }
};

export const uploadImage = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100000000 },
});
import isAuthorized from '../middlewares/auth';
import { customerLogin, customerRegister, getCustomerProfile, requestOTP, updateCustomerProfile, uploadPDF } from '../controllers/customerController';
import express, { Request, Response } from 'express'
import { upload, uploadImage } from '../middlewares/multer';

const router = express.Router()

router.get("/", async(req: Request, res: Response)=>{
    res.send("leee pal kwar")
})

router.post("/register", customerRegister)

router.post("/login", customerLogin)

router.get("/profile", getCustomerProfile)

router.patch("/profile", updateCustomerProfile)

router.get("/otp",isAuthorized, requestOTP)

router.post("/pdf-upload", upload.single('pdf'), uploadPDF)



export { router as customerRouter}

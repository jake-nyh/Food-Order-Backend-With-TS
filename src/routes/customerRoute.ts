import isAuthorized from '../middlewares/auth';
import { customerLogin, customerRegister, getCustomerProfile, requestOTP, updateCustomerProfile } from '../controllers/customerController';
import express, { Request, Response } from 'express'

const router = express.Router()

router.get("/", async(req: Request, res: Response)=>{
    res.send("leee pal kwar")
})

router.post("/register", customerRegister)

router.post("/login", customerLogin)

router.get("/profile", getCustomerProfile)

router.patch("/profile", updateCustomerProfile)

router.get("/otp",isAuthorized, requestOTP)



export { router as customerRouter}

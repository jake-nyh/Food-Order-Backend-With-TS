import isAuthorized from '../middlewares/auth';
import { customerLogin, customerRegister, customerVerify, getCustomerProfile, requestOTP, updateCustomerProfile } from '../controllers/customerController';
import express, { Request, Response } from 'express'

const router = express.Router()

router.post("/register", customerRegister)

router.post("/login", customerLogin)

router.patch("/verify",isAuthorized, customerVerify)

router.get("/profile", getCustomerProfile)

router.patch("/profile", updateCustomerProfile)

router.get("/otp",isAuthorized, requestOTP)

export { router as customerRouter}

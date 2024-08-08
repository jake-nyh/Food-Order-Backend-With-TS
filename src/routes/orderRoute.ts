import { createOrder, getAllOrders, getOrdersById } from 'controllers/orderController'
import express from 'express'
import isAuthorized from 'middlewares/auth'

const router = express.Router()

router.post('/', isAuthorized, createOrder);

router.get('/', isAuthorized, getAllOrders);

router.get('/', isAuthorized, getOrdersById)


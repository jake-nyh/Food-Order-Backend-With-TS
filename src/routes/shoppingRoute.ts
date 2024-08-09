import { SearchFoods, getFoodAvaliableIn30Minutes, getFoodAvaliablity, getResturantByID, getTopResturants } from "../controllers/shoppingController";
import express from "express"

const router = express.Router()

router.get("/:pincode", getFoodAvaliablity)

router.get("/top-resturants/:pincode", getTopResturants)

router.get("/food-in-30minutes/:pincode", getFoodAvaliableIn30Minutes)

router.get("/search/:pincode", SearchFoods)

router.get("/resturant/:id", getResturantByID)

export {router as shoopingRouter}

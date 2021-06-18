const express = require("express")
const router = express.Router()
const { getRestaurants, getRestaurant, addRestaurant } = require("../controllers/restaurantControllers")

router.get("/", getRestaurants)

router.get("/:id", getRestaurant)

router.post("/", addRestaurant)

module.exports = router
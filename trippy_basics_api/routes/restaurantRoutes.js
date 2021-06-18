const express = require("express")
const router = express.Router()
const {
    getRestaurants,
    getRestaurant,
    addRestaurant,
    changeRestaurantName,
    deleteRestaurant } = require("../controllers/restaurantControllers")
    
const { validationRestaurants } = require("../middlewares/validationsMiddlewares")

router.get("/", getRestaurants)

router.get("/:id", getRestaurant)

router.post("/", validationRestaurants, addRestaurant)

router.put("/:id", changeRestaurantName)

router.delete("/:id", deleteRestaurant)

module.exports = router
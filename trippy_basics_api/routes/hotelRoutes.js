const express = require("express")
const router = express.Router()
const { getHotels, getHotel, addHotel } = require("../controllers/hotelControllers")
const { validationHotels } = require("../middlewares/validationsMiddlewares")

router.get("/", getHotels)

router.get("/:id", getHotel)

router.post("/", validationHotels, addHotel)

module.exports = router
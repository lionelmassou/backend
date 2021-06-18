const express = require("express")
const router = express.Router()
const {
    getHotels,
    getHotel,
    addHotel,
    changeHotelName,
    deleteHotel } = require("../controllers/hotelControllers")

const { validationHotels } = require("../middlewares/validationsMiddlewares")

router.get("/", getHotels)

router.get("/:id", getHotel)

router.post("/", validationHotels, addHotel)

router.put("/:id", changeHotelName)

router.delete("/:id", deleteHotel)

module.exports = router
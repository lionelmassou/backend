const mongoose = require("mongoose")

const hotelSchema = new mongoose.Schema({
    name: String,
    address: String,
    city: String,
    country: String,
    stars: { type: Number, min: 1, max: 5 },
    hasSpa: Boolean,
    hasPool: Boolean,
    priceCategory: { type: Number, min: 1, max: 3 },
    created: { type: Date, default: Date.now }
})

const Hotel = mongoose.model("Hotel", hotelSchema)

module.exports = Hotel
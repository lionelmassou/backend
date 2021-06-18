const mongoose = require("mongoose")

const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    stars: { type: Number, min: 1, max: 5, required: true },
    hasSpa: Boolean,
    hasPool: Boolean,
    priceCategory: { type: Number, min: 1, max: 3 },
    rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],
    created: { type: Date, default: Date.now }
})

const hotelModel = mongoose.model("Hotel", hotelSchema)

module.exports = hotelModel
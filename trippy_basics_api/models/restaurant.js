const mongoose = require("mongoose")

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    stars: { type: Number, min: 1, max: 5, required: true },
    cuisine: { type: String, required: true },
    priceCategory: { type: Number, min: 1, max: 3, required: true },
    tables: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Table' }],
    created: { type: Date, default: Date.now }
})

const restaurantModel = mongoose.model("Restaurant", restaurantSchema)

module.exports = restaurantModel
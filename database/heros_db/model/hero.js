const mongoose = require("mongoose")

const heroSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    powers: [String],
    color: String,
    isAlive: Boolean,
    age: Number,
    image: String,
    created: { type: Date, default: Date.now }
})

const Hero = mongoose.model("Hero", heroSchema)

module.exports = Hero
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    profilePicture: String,
    created: { type: Date, default: Date.now }
})

const userModel = mongoosea.model("User", userSchema)

module.exports = userModel
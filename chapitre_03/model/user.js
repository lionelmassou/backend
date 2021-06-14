const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    profilePicture: String,
    created: { type: Date, default: Date.now }
})

const User = mongoose.model("User", userSchema)

module.exports = User
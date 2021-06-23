const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: { type: String, require:true },
    date: { type: Date, default: Date.now }


})
const userModel = mongoose.model("User", userSchema)

module.exports = userModel
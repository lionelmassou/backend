const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    age: Number,
    city: String,
    date: { type: Date, default: Date.now }
})

const UserModel = mongoose.model("UserModel", userSchema)

module.exports = UserModel
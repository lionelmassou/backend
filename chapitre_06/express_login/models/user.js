const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, trim: true },
    password: { type: String },
    confirmPassword: { type: String },
    firstname: { type: String, unique: true },
    surname: { type: String, unique: true },
    dateofbirth: { type: Date, unique: true },
    role: Number

})

const userModel = mongoose.model("User", userSchema)

module.exports = userModel
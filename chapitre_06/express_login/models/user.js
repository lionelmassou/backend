const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, trim: true },
    password: { type: String, unique: true },
    confirmPassword: { type: String, unique: true },
    firstname: { type: String, unique: true },
    surname: { type: String, unique: true },
    dateofbirth: { type: Date, unique: true, trim: true },
    role: Number

})

const userModel = mongoose.model("User", userSchema)

module.exports = userModel
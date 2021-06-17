const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: { type: String, require:true},
    email: { type: String, require:true},
    age: { type: Number, require:true},
    city: { type: String, require:true},
    date: { type: Date, default: Date.now }
})

const UserModel = mongoose.model("UserModel", userSchema)

module.exports = UserModel
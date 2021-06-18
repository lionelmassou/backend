const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/trippy_basics")

const roomSchema = mongoose.Schema({
    people: { type: Number, required: true },
    price: { type: Number, required: true },
    hasBathroom: Boolean
})

const roomModel = mongoose.model('Room', roomSchema)

module.exports = roomModel
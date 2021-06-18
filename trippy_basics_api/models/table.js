const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/trippy_basics")

const tableSchema = mongoose.Schema({
    seat: { type: Number, required: true },
    isVIP: Boolean
})

const tableModel = mongoose.model('Table', tableSchema)

module.exports = tableModel
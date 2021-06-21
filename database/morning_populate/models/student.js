const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/morning_populate")


const studentSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    surname: { type: String, required: true },
    address: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],
    created: { type: Date, default: Date.now }
})

const studentModel = mongoose.model('Student', studentSchema)

module.exports = studentModel
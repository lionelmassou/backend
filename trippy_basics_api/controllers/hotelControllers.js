const hotelModel = require("../models/hotel")
const expressValidator = require("express-validator");

const getHotels = async (req, res) => {
    try {
        const hotels = await hotelModel.find().lean()

        res.json(hotels)
    } catch (error) {
        res.status(500).json({ message: "There was a problem", error })
    }
}

const getHotel = async (req, res) => {
    try {
        const idHotel = req.params.id

        const hotel = await hotelModel.findById(idHotel).lean()
        // const hotel = await hotelModel.findById(idHotel).populate("rooms").lean()
        res.json(hotel)
    } catch (error) {
        res.status(500).json({ message: "There was a problem", error })
    }
}

const addHotel = async (req, res) => {
    try {
        const errors = expressValidator.validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() })
        } else {
            const newHotel = await hotelModel.create(req.body)
            res.json({ message: "The hotel was added!", newHotel })
        }
    } catch (error) {
        res.status(500).json({ message: "There was a problem", error })
    }
}

const changeHotelName = async (req, res) => {
    try {
        const id = req.params.id
        const newNameHotel = req.body.name

        await hotelModel.findByIdAndUpdate(id, { name: newNameHotel })
        res.json({ message: "The name was replaced!" })
    } catch (err) {
        console.error('Error PUT / hotels / :id !!!', err)
        res.json({ message: "There was a problem here Error PUT / hotels / :id sorry:(" })
    }
}

const deleteHotel = async (req, res) => {
    try {
        const hotelId = req.params.id

        await hotelModel.findByIdAndDelete(hotelId)
        res.json({ message: 'Hotel deleted' })
    } catch (err) {
        console.error('Error Delete / hotels / :id !!!', err)
        res.status(500).json({ message: "There was a problem here Error PUT / hotels / :id sorry:(" })
    }
}

module.exports = {
    getHotels,
    getHotel,
    addHotel,
    changeHotelName,
    deleteHotel
}
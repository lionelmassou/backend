const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
// const Restaurant = require("./model/restaurant.js")
const Hotel = require("./model/hotel.js")

mongoose.connect("mongodb://localhost:27017/trippy_BD", (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("I'm connected to the database")
    }
})

const port = 8000
const app = express()

const debug = (req, res, next) => {
    console.log("I received a request!");

    next()
}
app.use(cors())
app.use(express.json())
app.use(debug)

app.get("/hotels", async (req, res) => {
    try {
        const hotels = await Hotel.find()

        res.json(hotels)
    } catch (err) {
        console.error(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }
})

const findHotel = async (name) => {
    try {
        return await Hotel.findOne({
            name: {
                $regex: new RegExp("^" + name, "i")
            }
        })
    } catch (err) {
        console.error(err)

        return null
    }
}

app.get("/hotels/:id", async (req, res) => {

    try {
        const id = req.params.id
        const hotelId = await findHotel(id)

        if (hotelId) {
            res.json({ hotelId })
        } else {
            res.json({
                message: "Id is not found"
            })
        }
    } catch (err) {
        console.error(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }
})

app.post("/hotels",
    // async (req, res, next) => {

    //     try {
    //         const hotelBody = req.body
    //         const hotelId = await findHotel(hotelBody.name)

    //         if (hotelId) {
    //             res.status(400).json({
    //                 message: "The hotelId already exists"
    //             })
    //         } else {
    //             next()
    //         }

    //     } catch (err) {
    //         console.error(err)

    //         res.status(500).json({ errorMessage: "There was a problem :(" })
    //     }
    // }, 
    async (req, res) => {

        try {
            const hotel = req.body

            const newHotel = await Hotel.create(hotel)

            res.json({
                message: "Ok, hero was created!",
                newHotel
            })
        } catch (err) {
            console.error(err)

            res.status(500).json({ errorMessage: "There was a problem :(" })
        }

    })

app.get("*", (req, res) => {
    res.json({
        errorMessage: "The route was not found"
    }, 404)
})

app.listen(port, () => {
    console.log("Server is listening at port ", port);
})
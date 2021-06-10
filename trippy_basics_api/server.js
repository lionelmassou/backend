const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const Restaurant = require("./model/restaurant.js")
const Hotel = require("./model/hotel.js")

mongoose.connect("mongodb://localhost:27017/trippy_BD", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
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

        console.log("see what is inside: ", hotels);

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
            // _id: id
        })
    } catch (err) {
        console.error(err)

        return null
    }
}

const findRestaurant = async (name) => {
    try {
        return await Restaurant.findOne({
            name: {
                $regex: new RegExp("^" + name, "i")
            }
            // _id: id
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
            res.json(hotelId)
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
    async (req, res, next) => {

        try {
            const hotelBody = req.body
            const hotelName = await findHotel(hotelBody.name)

            if (hotelName) {
                res.status(400).json({
                    message: `The ${hotelName} already exists`
                })
            } else {
                next()
            }

        } catch (err) {
            console.error(err)

            res.status(500).json({ errorMessage: "There was a problem :(" })
        }
    },
    async (req, res) => {

        try {
            const hotel = req.body

            console.log("this is the hotel: ", hotel);

            const newHotel = await Hotel.create(hotel)

            res.json({
                message: "Ok, hotel was add in the list!",
                // newHotel
            })
        } catch (err) {
            console.error(err)

            res.status(500).json({ errorMessage: "There was a problem :(" })
        }

    })

const continueIfHotelExists = async (req, res, next) => {
    try {
        const name = req.params.name

        const hotelName = await findHotel(name)

        if (hotelName) {
            next()
        } else {
            res.status(400).json({ errorMessage: "Hotel was not found" })
        }

    } catch (err) {
        console.error(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }
}

const continueIfRestaurantExists = async (req, res, next) => {
    try {
        const name = req.params.name

        const restaurantName = await findHotel(name)

        if (restaurantName) {
            next()
        } else {
            res.status(400).json({ errorMessage: "Hotel was not found" })
        }

    } catch (err) {
        console.error(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }
}

app.put("/hotels/:id?name=newName", continueIfHotelExists, async (req, res) => {
    try {
        const id = req.params.id
        // const newNameHotel = req.body

        await Hotel.replaceOne({ _id: id }).update({ $set: { name: newNameHotel } })

        res.json({
            message: `The name was replaced!`
        })

    } catch (err) {
        console.error(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }

})

app.delete("/hotels/:id", continueIfHotelExists, async (req, res) => {
    try {
        const hotelId = req.params.id

        await Hotel.deleteOne({
            // name: {
            //     $regex: new RegExp("^" + hotelId, "i")
            // }
            _id: hotelId
        })

        res.json({
            message: `The hotel has been delete`
        })
    } catch (err) {
        console.error(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }
})

app.get("/restaurants", async (req, res) => {
    try {
        const restaurants = await Restaurant.find()

        console.log("see what is inside: ", restaurants);

        res.json(restaurants)
    } catch (err) {
        console.error(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }
})

app.get("/restaurants/:id", async (req, res) => {

    try {
        const id = req.params.id
        const restaurantId = await findRestaurant(id)

        if (restaurantId) {
            res.json(restaurantId)
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

app.post("/restaurants",
    async (req, res, next) => {

        try {
            const restaurantBody = req.body
            const restaurantName = await findRestaurant(restaurantBody.name)

            if (restaurantName) {
                res.status(400).json({
                    message: `The ${restaurantName} already exists`
                })
            } else {
                next()
            }

        } catch (err) {
            console.error(err)

            res.status(500).json({ errorMessage: "There was a problem :(" })
        }
    },
    async (req, res) => {

        try {
            const restaurant = req.body

            console.log("this is the hotel: ", restaurant);

            const newHotel = await Hotel.create(restaurant)

            res.json({
                message: "Ok, hotel was add in the list!",
            })
        } catch (err) {
            console.error(err)

            res.status(500).json({ errorMessage: "There was a problem :(" })
        }

    })

app.put("/restaurants/:id?name=newName", continueIfRestaurantExists, async (req, res) => {
    try {
        const id = req.params.id
        // const newNameRestaurant = req.body

        await Restaurant.replaceOne({ _id: id }).update({ $set: { name: newNameHotel } })

        res.json({
            message: `The name was replaced!`
        })

    } catch (err) {
        console.error(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }
})

app.delete("/restaurants/:id", continueIfHotelExists, async (req, res) => {
    try {
        constrestaurantId = req.params.id

        await Hotel.deleteOne({
            // name: {
            //     $regex: new RegExp("^" + hotelId, "i")
            // }
            _id: hotelId
        })

        res.json({
            message: `The hotel has been delete`
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
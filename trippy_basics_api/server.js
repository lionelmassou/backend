const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const Restaurant = require("./model/restaurant.js")
const Hotel = require("./model/hotel.js")
const Room = require("./model/room.js")
const Table = require("./model/table.js")

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

const findHotel = async (id) => {
    try {
        return await Hotel.findOne({
            // name: {
            //     $regex: new RegExp("^" + name, "i")
            // }
            _id: id
        })
    } catch (err) {
        console.error(err)

        return null
    }
}

const findRestaurant = async (id) => {
    try {
        return await Restaurant.findOne({
            // name: {
            //     $regex: new RegExp("^" + name, "i")
            // }
            _id: id
        })
    } catch (err) {
        console.error(err)

        return null
    }
}

app.get("/hotels/:id", async (req, res) => {

    try {
        const id = req.params.id

        const hotelById = await Hotel.findById(id).populate("rooms")
        res.json(hotelById)

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

    // autre methode

    // app.post("/hotels", async (req, res) => {
    //     try {
    //         let addHotel = req.body
    
    //         await Hotel.create(addHotel)
    //         res.json({ message: "the hotel is add!" })
    
    //     } catch (err) {
    //         console.error('Error POST / hotels !!!', err);
    //         res.json({ message: "Error POST / hotels !!!" })
    //     }
    // })


app.put("/hotels/:id", async (req, res) => {
    try {
        const id = req.params.id
        const newNameHotel = req.body

        await Hotel.findByIdAndUpdate(id, { name: newNameHotel })

        res.json({ message: "The name was replaced!" })

    } catch (err) {
        console.error('Error PUT / hotels / :id !!!', err)

        res.json({ message: "There was a problem here Error PUT / hotels / :id sorry:(" })
    }
})


app.delete("/hotels/:id", async (req, res) => {
    try {
        const hotelId = req.params.id

        await Hotel.findByIdAndDelete(hotelId)

        res.json({ message: 'Hotel deleted' })

    } catch (err) {
        console.error('Error Delete / hotels / :id !!!', err)

        res.status(500).json({ message: "There was a problem here Error PUT / hotels / :id sorry:(" })
    }
})


app.get("/restaurants", async (req, res) => {
    try {
        const restaurants = await Restaurant.find()

        console.log("see what is inside: ", restaurants);

        res.json(restaurants)
    } catch (err) {
        console.error('Error Delete / restaurant / :id !!!', err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }
})

app.get("/restaurants/:id", async (req, res) => {

    try {
        const id = req.params.id
        const restaurantById = await Restaurant.findById(id).populate("tables")
        res.json(restaurantById)
    } catch (err) {
        console.error('Error Delete / restaurant / :id !!!', err)

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
            console.error('Error Delete / restaurant / :id !!!', err)

            res.status(500).json({ errorMessage: "There was a problem :(" })
        }
    },
    async (req, res) => {

        try {
            const restaurant = req.body

            console.log("this is the hotel: ", restaurant);

            const newHotel = await Restaurant.create(restaurant)

            res.json({
                message: "Ok, hotel was add in the list!",
            })
        } catch (err) {
            console.error(err)

            res.status(500).json({ errorMessage: "There was a problem :(" })
        }
    }
)

app.put("/restaurants/:id", async (req, res) => {
    try {
        const id = req.params.id
        const newNameRestaurant = req.body

        await Restaurant.findByIdAndUpdate(id, { name: newNameRestaurant })

        res.json({
            message: `The name was replaced!`
        })

    } catch (err) {
        console.error('Error PUT / restaurants / :id !!!', err)

        res.status(500).json({ message: "There was a problem here Error PUT / restaurants / :id sorry:(" })
    }
})

app.delete("/restaurants/:id", async (req, res) => {
    try {
        const restaurantId = req.params.id
        await Restaurant.findByIdAndDelete(restaurantId)

        res.json({
            message: `The restaurant has been delete`
        })
    } catch (err) {
        console.error('Error PUT / restaurants / :id !!!', err)

        res.status(500).json({ message: "There was a problem here Error PUT / restaurants / :id sorry:(" })
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
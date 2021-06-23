const express = require("express")
const mongoose = require("mongoose")
const userModel = require("./models/user")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("./config.js")

mongoose.connect(config.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log("There was a problem when connection to the database")
    } else {
        console.log("I'm connected to the database")
    }
})

const port = config.port

const app = express()

app.use(express.json())

app.post("/signup", async (req, res) => {
    try {
        const username = req.body.username
        const password = bcryptjs.hashSync(req.body.password)

        const user = await userModel.create({ username, password })

        res.json({ message: "User was created!", user })
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

app.post("/login", async (req, res) => {
    try {
        const username = req.body.username
        const user = await userModel.findOne({ username })

        const result = bcryptjs.compareSync(req.body.password, user.password)

        if (result) {
            const token = await jwt.sign({
                id: user._id
            }, config.secret,
                {
                    expiresIn: 60 * 60
                })

            res.json({ message: "You're now login!", token })
        } else {
            res.status(401).json({ message: "Login failed" })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

app.get("/public", (req, res) => {
    res.json("Everyone can acces this route!")
})

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]

        const result = jwt.verify(token, config.secret)

        if (result.id) {
            const user = await userModel.findById({ _id: result.id })

            next()
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

app.get("/private", verifyToken, async (req, res) => {
    res.json("You have acces to this route!")
})

app.listen(port, () => {
    console.log("The server is waiting for requests")
})
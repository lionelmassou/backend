const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')
const config = require("./config.js")
const authRoutes = require("./routes/authRoutes")
const usersRoutes = require("./routes/usersRoutes")

mongoose.connect(config.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log("There was a problem when connection to the database")
    } else {
        console.log("I'm connected to the database")
    }
})

const port = config.port

const app = express()

app.use(cors())

app.use(express.json())

app.use("/auth", authRoutes)
app.use("/users", usersRoutes)

app.listen(port, () => {
    console.log("The server is waiting for requests")
})
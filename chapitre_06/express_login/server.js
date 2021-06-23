const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const config = require("./config.js")
const authRoutes = require("./routes/authRoutes")
const usersRoutes = require("./routes/usersRoutes")

mongoose.connect("mongodb://localhost:27017/express_login", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.error(err)
    } else {
        console.log("I'm connected to the database");
    }
})

const port = config.port

// const port = 8000

const app = express()

app.use(cors())
app.use(express.json())

app.use("/auth", authRoutes)
app.use("/users", usersRoutes)

app.listen(port, () => {
    console.log(`J'écoute des requêtes sur le port ${port}`);
})
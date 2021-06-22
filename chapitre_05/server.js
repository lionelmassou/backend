const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const UserModel = require('./models/user')
const expressValidator = require("express-validator");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

mongoose.connect("mongodb://localhost:27017/signup", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.error(err)
    } else {
        console.log("I'm connected to the database");
    }
})

const port = 8000

const app = express()

app.use(cors())
app.use(express.json())

app.get("/signup", async (req, res) => {
    try {

        const users = await UserModel.find({})

        res.json({ users })

    } catch (error) {
        console.log("Error:", error)

        res.status(500).json({ message: "Erreur en traitant la requête" })
    }
})

app.post("/signup", async (req, res) => {

    expressValidator.body("username").exists().isLength({ min: 4 })
    expressValidator.body("password").exists().isLength({ min: 4 })

    // exports.signup = (req, res) => {
    //     const user = new User({
    //         username: req.body.username,
    //         email: req.body.email,
    //         password: bcrypt.hashSync(req.body.password, 8)
    //     });

    try {

        const errors = expressValidator.validationResult(req);
        if (errors.isEmpty() === false) {
            res.status(400).json({
                errors: errors.array(), // to be used in a json loop
                message: 'there is a problem'
            });
            return;
        } else {

            const userName = req.body.username
            const userPassword = await bcrypt.hash(req.body.password, 10)

            // console.log("username is : ", userName);

            const newUser = await UserModel.create({ username: userName, password: userPassword })

            console.log("newUser is : ", newUser);

            res.json({
                success: true,
                message: 'User will be saved',
                newUser
            })
        }

    } catch (error) {
        console.log("Error:", error)

        res.status(500).json({ message: "Erreur en traitant la requête" })
    }
})

app.listen(port, () => {
    console.log(`J'écoute des requêtes sur le port ${port}`);
})
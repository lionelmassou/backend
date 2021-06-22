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

        const user = await UserModel.find({})

        res.json(user)

    } catch (error) {
        console.log("Error:", error)

        res.status(500).json({ message: "Erreur en traitant la requête" })
    }
})

app.post("/signup", async (req, res) => {

    expressValidator.body("username").exists().isLength({ min: 4 })
    expressValidator.body("password").exists().isLength({ min: 4 })

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

            // console.log("newUser is : ", newUser);

            if (!newUser) {
                return 'Username or password is incorrect'
            } else {
                // create a jwt token that is valid for 7 days
                const token = jwt.sign({userId: mongoose.isValidObjectId()}, config.secret, { expiresIn: '7d' });
            }


            res.json({
                success: true,
                message: 'User will be saved',
                newUser,
                token
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
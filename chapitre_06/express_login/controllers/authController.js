const userModel = require("../models/user")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("../config.js")

const signup = async (req, res) => {

    try {
        const email = req.body.email
        // console.log("mail: ", email);
        // const password = bcryptjs.hashSync(req.body.password)
        let password = req.body.password
        // console.log("password: ", password);
        const confirmPassword = req.body.confirmPassword
        // console.log("password: ", confirmPassword);
        const firstname = req.body.firstname
        const surname = req.body.surname
        const dateofbirth = req.body.dateofbirth
        const role = req.body.role

        if (password === confirmPassword) {
            password = bcryptjs.hashSync(req.body.password)

            const user = await userModel.create({ email, password, firstname, surname, dateofbirth, role })
            res.json({ message: "User was created!", user })

        } else {
            res.json({
                message: "the password isn't the same"
            })
        }

    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: "There was an error while treating the request" })
    }
}

const login = async (req, res) => {
    try {
        const email = req.body.email
        const user = await userModel.findOne({ email })

        const result = bcryptjs.compareSync(req.body.password, user.password)

        if (result) {
            const token = jwt.sign(
                {
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
        console.log("Error: ", error)
        res.status(500).json({ message: "There was an error while treating the request" })
    }
}

module.exports = { signup, login }
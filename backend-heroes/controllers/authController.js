const userModel = require("../models/user")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("../config.js")

const signup = async (req, res) => {
    try {
        const { email, role, firstName, lastName, password } = req.body
        const passwordHashed = bcryptjs.hashSync(password)

        const user = await userModel.create({ email, password: passwordHashed, role, firstName, lastName })

        res.json({ message: "User was created!", id: user._id })
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: "There was an error while treating the request" })
    }
}

const login = async (req, res) => {
    try {
        const user = req.user

        const result = bcryptjs.compareSync(req.body.password, user.password)

        if (result) {
            const token = jwt.sign(
                {
                    id: user._id
                }, config.secret,
                {
                    expiresIn: 60 * 60
                })

            res.json({ message: "You're now logged in!", token })
        } else {
            res.status(401).json({ message: "Login failed" })
        }
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: "There was an error while treating the request" })
    }
}

module.exports = { signup, login }
const express = require("express")
const router = express.Router()
const expressValidator = require("express-validator");

const { signup, login } = require("../controllers/authController")

router.post("/signup",
    expressValidator.body("email").exists().isEmail().normalizeEmail(),
    expressValidator.body("password").exists().notEmpty(),
    expressValidator.body("firstname").exists(),
    expressValidator.body("surname").exists(),
    expressValidator.body("dateofbirth").exists(),
    signup
)

router.post("/login", login)

module.exports = router
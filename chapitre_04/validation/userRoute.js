const express = require("express")
const router = express.Router()

// const UserModel = require("./model/userModel")
const debug = require("./middleware/debug")

const { userAddAfterValidation, getAllUser, getUsername, getUserEmail, getUserById } = require('./controler/userControler')

const expressValidator = require("express-validator");
// const passwordValidator = require('password-validator');

const app = express();

app.use(express.json());

router.get("/", debug, getAllUser)

router.post('/add', debug,
    expressValidator.body("username").exists().isLength({ min: 4 }).trim(),
    expressValidator.body("email").exists().isEmail().normalizeEmail(),
    expressValidator.body("age").exists().isInt({ min: 10, max: 99 }),
    expressValidator.body("city").isIn(['Paris', 'Tokyo', 'Los Angeles']),
    userAddAfterValidation
);

router.get('/:username', debug, getUsername);

router.get('/email/:email', debug, getUserEmail);

router.get('/id/:id', debug, getUserById);

router.all("*", (req, res) => {
    res.json({
        message: "The route doesn't exist"
    })
})

module.exports = router
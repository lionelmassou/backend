const express = require("express")
const router = express.Router()

const UserModel = require("./model/userModel")
const debug = require("./middleware/debug")

const { userAddAfterValidation, getAllUser, getUsername } = require('./controler/userControler')

const expressValidator = require("express-validator");
// const passwordValidator = require('password-validator');

const app = express();

app.use(express.json());

router.get("/", debug, getAllUser)

router.post('/add', debug,
    expressValidator.body("username").exists().isLength({ min: 4 }),
    expressValidator.body("mail").exists().isEmail(),
    expressValidator.body("age").exists().isInt({ min: 10, max: 99 }),
    expressValidator.body("city").isIn(['Paris', 'Tokyo', 'Los Angeles']),
    userAddAfterValidation
);

router.get('/:username', debug, getUsername);

router.get('/:email', debug);

router.all("*", (req, res) => {
    res.json({
        message: "The route doesn't exist"
    })
})

module.exports = router
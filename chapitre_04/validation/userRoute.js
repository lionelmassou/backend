const express = require("express")
const router = express.Router()

const UserModel = require("./model/userModel")
const debug = require("./middleware/debug")

const { userValidationAndAdd, getAllUser, getUsername} = require('./controler/userControler')

// const expressValidator = require("express-validator");
// const passwordValidator = require('password-validator');

const app = express();

app.use(express.json());

router.get("/", debug, getAllUser) 

router.post('/users/add', debug, userValidationAndAdd);

router.get('/users/:username',debug, getUsername);

router.get('/users/:email',debug);

router.all("*", (req, res) => {
    res.json({
        message: "The route doesn't exist" 
    })
})

module.exports = router
const userModel = require('../model/userModel')
const expressValidator = require("express-validator");


const userValidationAndAdd = async (req, res) => {
    try {
        expressValidator.body("username").exists().isLength({ min: 4 }),
            expressValidator.body("mail").exists().isEmail(),
            expressValidator.body("age").exists().isNumeric({ min: 0, max: 99 }).isLength({ max: 2 }),
            expressValidator.body("city").isIn(['Paris', 'Tokyo', 'Los Angeles']),
            (req, res) => {
                const errors = expressValidator.validationResult(req);
                if (errors.isEmpty() === false) {
                    res.status(400).json({
                        errors: errors.array(), // to be used in a json loop
                        message: 'there is a problem'
                    });
                    return;
                } else {

                    const user = req.body
                    console.log("what is user: ", user)

                    const newUser = User.create(user)

                    res.json({
                        success: true,
                        message: 'User will be saved'

                    });
                }
            }
    } catch (err) {
        console.log(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }
}

const getAllUser = async (req, res) => {
    // const users = []

    try {
        const users = await User.find({})

        res.json(users)
    } catch (err) {
        console.error(err)

        res.json({ errorMessage: "There was a probleme :(" }, 500)
    }
}

const getUsername = async (req, res) => {
    try {

        const userGet = req.params
        console.log(req.params);
        console.log(req.params.username);

        const users = await User.find(userGet)

        res.json(users)
    } catch (err) {
        console.error(err)

        res.json({ errorMessage: "There was a probleme :(" }, 500)
    }
}

module.exports = { userValidationAndAdd, getAllUser, getUsername }
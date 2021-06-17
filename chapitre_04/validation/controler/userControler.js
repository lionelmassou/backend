const expressValidator = require("express-validator");
const UserModel = require('../model/userModel');


const userAddAfterValidation = async (req, res) => {
    try {

        // await UserModel.deleteMany({})
      
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

            const newUser = await UserModel.create(user)

            res.json({
                success: true,
                message: 'User will be saved'

            });
        }
    // }
    } catch (err) {
        console.log(err)

        res.status(500).json({ errorMessage: "There was a problem :(" })
    }
}

const getAllUser = async (req, res) => {
    // const users = []

    try {
        const users = await UserModel.find({})

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

        const users = await UserModel.find(userGet)

        res.json(users)
    } catch (err) {
        console.error(err)

        res.json({ errorMessage: "There was a probleme :(" }, 500)
    }
}

module.exports = { userAddAfterValidation, getAllUser, getUsername }
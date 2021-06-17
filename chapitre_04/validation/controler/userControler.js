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
        // console.log(req.params);
        // console.log(req.params.username);

        const users = await UserModel.find(userGet)

        res.json(users)
    } catch (err) {
        console.error(err)

        res.json({ errorMessage: "There was a probleme :(" }, 500)
    }
}


const getUserEmail = async (req, res) => {
    try {

        // let userByMail = []
        console.log("c'est quoi rep.params: ", req.params);
        console.log("c'est quoi req.params.email: ", req.params.email);

        const userEmail = req.params.email

        const getUser = await UserModel.find(userEmail)
        res.json({
            message: "the request is done",
            // userByMail: getUser
            getUser
        })

    } catch (err) {
        console.error(err)

        res.status(500).json({ message: "There was a problem", err })
    }
}

// const getUserEmail = async (req, res) => {

//     console.log("c'est quoi rep.params: ", req.params);
//     console.log("c'est quoi req.params.email: ", req.params.email);

//     const userEmail = req.params
//     try {

//         // let userByMail = []

//                const getUser = await UserModel.find(userEmail)

//                console.log("getUser c'est quoi: ", getUser);

//         res.json({
//             message: "the request is done",
//             // userByMail: getUser
//             getUser
//         })

//     } catch (err) {
//         console.error(err)

//         res.status(500).json({ message: "There was a problem", err })
//     }
// }

const getUserById = async (req, res) => {
    const userId = req.params.id
    try {

        console.log("c'est quoi userId: ", userId);

        const getUser = await UserModel.findById(userId).lean()
        res.json({
            message: "the request is done",
            getUser
        })

    } catch (error) {

        res.status(500).json({ message: "There was a problem", error })
    }
}


module.exports = { userAddAfterValidation, getAllUser, getUsername, getUserEmail, getUserById }
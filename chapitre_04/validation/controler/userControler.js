const userModel = require('../model/userModel')
const expressValidator = require("express-validator");


const userValidationAndAdd = async (req, res) => {
    try {
        expressValidator.body("username").exists().isLength({ min: 4 }),
            expressValidator.body("mail").exists().isEmail(),
            expressValidator.body("age").exists().isNumeric({ min: 0, max: 99 }).isLength({ max: 2 }),
            expressValidator.body("city").isIn(['Paris', 'Tokyo', 'Los Angeles']),
            // expressValidator.body("password").custom((value) => {
            //     var schema = new passwordValidator();
            //     schema
            //         .is().min(8) // Minimum length 8
            //         .is().max(100) // Maximum length 100
            //         .has().uppercase() // Must have uppercase letters
            //         .has().lowercase() // Must have lowercase letters
            //         .has().digits(2) // Must have at least 2 digits
            //         .has().not().spaces() // Should not have spaces
            //         .is().not().oneOf(["Passw0rd", "Password123"]);
            //     return schema.validate(value);
            // }),
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

module.exports = { userValidationAndAdd }
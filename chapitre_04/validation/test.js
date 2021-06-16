const express = require("express");
const expressValidator = require("express-validator");
const passwordValidator = require('password-validator');

const app = express();

app.use(express.json());

app.post('/signup',
  expressValidator.body("username").exists().isEmail(),
//   expressValidator.body("password").custom((value) => {
//     var schema = new passwordValidator();
//     schema
//       .is().min(8) // Minimum length 8
//       .is().max(100) // Maximum length 100
//       .has().uppercase() // Must have uppercase letters
//       .has().lowercase() // Must have lowercase letters
//       .has().digits(2) // Must have at least 2 digits
//       .has().not().spaces() // Should not have spaces

//     return schema.validate(value);
//   }),
    (req, res) => {
        const errors = expressValidator.validationResult(req);
        if (errors.isEmpty() === false) {
            res.json({
                errors: errors.array() // to be used in a json loop
            });
            return;
        } else {
            res.json({
                success: true,
                message: 'User will be saved'
            });
        }
    }
);

app.listen(8000, () => {
  console.log('Server started');
});
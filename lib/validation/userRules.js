const {check} = require('express-validator')

exports.userValidationRules = [
    //check email
    check('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Bitte prüff deine Email-Adresse'),
    //check first name
    check('firstName')
        .exists({min:2})
        .trim()
        .withMessage('Vorname ist ein Pflichtfeld'),
    // password check
    check('password')
        .isLength({min : 10})
        .withMessage('Min 10 zeichen')
]
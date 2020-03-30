const { validationResult} = require('express-validator')


const validateInputs = rules => {
    return [
        ...rules, 
        (req, res, next) =>{
            const errors = validationResult(req);
            console.log("errors",errors)
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            
            next()
            
            }
                ]

}



  module.exports = {validateInputs}
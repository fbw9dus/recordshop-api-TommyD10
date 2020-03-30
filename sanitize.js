const validatorjs = require('validator')

const myEmail = "tomiSlavDumancic@hotmail.com"

const sanitizedEmail = validatorjs.normalizeEmail(myEmail)

console.log(sanitizedEmail)
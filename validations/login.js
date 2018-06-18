const Validator = require('validator');
const isEmpty = require('./is-empty');

const userLoginValidator = (data) => {
    const errors = {};
    if(Validator.isEmpty(data.email || '')) {
        errors.email = 'email is empty';
    }
    else if(!Validator.isEmail(data.email)) {
        errors.email = 'email is invalid';
    }
    if(Validator.isEmpty(data.password || '')) {
        errors.password = 'password is empty';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = userLoginValidator;


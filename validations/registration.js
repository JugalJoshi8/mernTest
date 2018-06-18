const Validator = require('validator');
const isEmpty = require('./is-empty');

const userRegistrationValidator = (data) => {
    const errors = {};
    if(!Validator.isLength(data.name, {min: 2, max: 20})) {
        errors.name = 'name should be between 2 and 20 characters';
    }
    if(Validator.isEmpty(data.email || '')) {
        errors.email = 'email is empty';
    }
    else if(!Validator.isEmail(data.email)) {
        errors.email = 'email is invalid';
    }
    if(Validator.isEmpty(data.password || '')) {
        errors.password = 'password is empty';
    }
    if(Validator.isEmpty(data.password2 || '')) {
        errors.password2 = 'confirm password is empty';
    }
    if(!Validator.equals(data.password, data.password2)) {
        errors.password = 'password does not match';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = userRegistrationValidator;


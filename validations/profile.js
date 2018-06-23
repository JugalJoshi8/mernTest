const Validator = require('validator');
const isEmpty = require('./is-empty');

const profileValidator = (data) => {
    console.log(data);
    const errors = {};
    if(Validator.isEmpty(data.handle || '')) {
        errors.handle = 'handle is empty';
    }
    else if(!Validator.isLength(data.handle, { min: 2, max: 40})) {
         errors.handle = 'handle should be between 2 and 40 characters';
    }
    if(Validator.isEmpty(data.status || '')) {
        errors.status = 'status is invalid';
    }
    if(Validator.isEmpty(data.skills || '')) {
        errors.skills = 'skills is empty';
    }
    if(!Validator.isEmpty(data.website || '') && !Validator.isURL(data.website)) {
        errors.website = 'invalida website';
    }
    if(!Validator.isEmpty(data.twitter || '') && !Validator.isURL(data.twitter)) {
        errors.twitter = 'invalida twitter';
    }
    if(!Validator.isEmpty(data.facebook || '') && !Validator.isURL(data.facebook)) {
        errors.facebook = 'invalida facebook';
    }
    if(!Validator.isEmpty(data.linkedin || '') && !Validator.isURL(data.linkedin)) {
        errors.linkedin = 'invalida linkedin';
    }
    if(!Validator.isEmpty(data.instagram || '') && !Validator.isURL(data.instagram)) {
        errors.instagram = 'invalida instagram';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = profileValidator;


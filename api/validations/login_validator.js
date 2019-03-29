import Validator from 'validator';
import ResponseMessage from '../lib/constants';
import HelperValidator from './helper_validator';

/**
 * Method to validate register input
 *
 * @param data Data to be validated
 *
 * @returns {{errors, isValid}}
 */
module.exports = function validateLoginInput(data) {
    let errors = {};

    data.name = !HelperValidator.isEmpty(data.name) ?  data.name : '';
    data.email = !HelperValidator.isEmpty(data.email) ? data.email : '';
    data.password = !HelperValidator.isEmpty(data.password) ? data.password : '';
    data.confirmPassword = !HelperValidator.isEmpty(data.confirmPassword) ? data.confirmPassword : '';


    if (!Validator.isEmail(data.email)) {
        errors.email = ResponseMessage.ValidationErrors.EMAIL_EMPTY;
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = ResponseMessage.ValidationErrors.PASSWORD_EMPTY;
    }

    return {
        errors,
        isValid: HelperValidator.isEmpty(errors)
    }
};
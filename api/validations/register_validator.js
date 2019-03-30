import Validator from 'validator';
import ResponseMessage from '../lib/constants';
import HelperValidator from './helper_validator';

const NAME_MIN_LEN = 2;
const NAME_MAX_LEN = 20;
const PASSWORD_MIN_LEN = 6;
const PASSWORD_MAX_LEN = 30;

/**
 * Method to validate register input
 *
 * @param data Data to be validated
 *
 * @returns {{errors, isValid}}
 */
module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.name = !HelperValidator.isEmpty(data.name) ?  data.name : '';
    data.email = !HelperValidator.isEmpty(data.email) ? data.email : '';
    data.password = !HelperValidator.isEmpty(data.password) ? data.password : '';
    data.confirmPassword = !HelperValidator.isEmpty(data.confirmPassword) ? data.confirmPassword : '';


    if (!Validator.isLength(data.name, {min: NAME_MIN_LEN, max: NAME_MAX_LEN})) {
        errors.name = ResponseMessage.ValidationErrors.NAME_VALIDATION
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = ResponseMessage.ValidationErrors.EMAIL_EMPTY;
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = ResponseMessage.ValidationErrors.PASSWORD_EMPTY;
    }

    if (Validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = ResponseMessage.ValidationErrors.CONFIRMATION_PASSWORD_EMPTY;
    }

    if (!Validator.isLength(data.password, {min: PASSWORD_MIN_LEN, max: PASSWORD_MAX_LEN})) {
        errors.password = ResponseMessage.ValidationErrors.PASSWORD_VALIDATION;
    }

    if (data.password !== data.confirmPassword) {
        errors.confirmPassword = ResponseMessage.ValidationErrors.CONFIRMATION_PASSWORD_VALIDATION;
    }

    return {
        errors,
        isValid: HelperValidator.isEmpty(errors)
    }
};
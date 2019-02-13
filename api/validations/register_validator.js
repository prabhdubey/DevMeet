import Validator from 'validator';
import ResponseMessage from '../lib/constants';
import isEmpty from './is_empty';

const NAME_MIN_LEN = 2;
const NAME_MAX_LEN = 10;
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

    data.name = !isEmpty(data.name) ?  data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';


    if (!Validator.isLength(data.name, {min: NAME_MIN_LEN, max: NAME_MAX_LEN})) {
        errors.name = ResponseMessage.ValidationErrors.NAME_VALIDATION
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = ResponseMessage.ValidationErrors.NAME_EMPTY;
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
        isValid: isEmpty(errors)
    }
};
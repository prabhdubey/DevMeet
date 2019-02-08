import Validator from 'validator';
import ResponseMessage from '../lib/constants';
import isEmpty from './is_empty';

const NAME_MIN_LEN = 2;
const NAME_MAX_LEN = 10;

/**
 * Method to validate register input
 *
 * @param data Data to be validated
 *
 * @returns {{errors, isValid}}
 */
module.exports = function validateRegisterInput(data) {
    let errors = {};

    if (!Validator.isLength(data.name, {min: NAME_MIN_LEN, max: NAME_MAX_LEN})) {
        errors.name = ResponseMessage.ValidationErrors.NAME_VALIDATION
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};
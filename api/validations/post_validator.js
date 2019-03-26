import HelperValidator from './helper_validator';
import ResponseMessage from '../lib/constants';
const Validator = require('validator');

const POST_TEXT_MIN_LEN = 10;
const POST_TEXT_MAX_LEN = 300;

module.exports = function validatePostInput(data) {
    let errors = {};

    data.text = !HelperValidator.isEmpty(data.text) ? data.text : '';

    if (!Validator.isLength(data.text, { min: POST_TEXT_MIN_LEN, max: POST_TEXT_MAX_LEN })) {
        errors.text = ResponseMessage.ValidationErrors.POST_TEXT_LEN_VALIDATION;
    }

    if (Validator.isEmpty(data.text)) {
        errors.text = ResponseMessage.ValidationErrors.POST_TEXT_REQUIRED;
    }

    return {
        errors,
        isValid: HelperValidator.isEmpty(errors)
    };
};

const Validator = require('validator');
const HelperValidator = require('./helper_validator');
import ResponseMessage from '../lib/constants';

module.exports = function validateProfileInput(data) {
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';

    if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = ResponseMessage.ValidationErrors.HANDLE_LENGTH_VALIDATION;
    }

    if (Validator.isEmpty(data.handle)) {
        errors.handle = ResponseMessage.ValidationErrors.HANDLE_REQUIRED;
    }

    if (Validator.isEmpty(data.status)) {
        errors.status = ResponseMessage.ValidationErrors.STATUS_REQUIRED;
    }

    if (Validator.isEmpty(data.skills)) {
        errors.skills = ResponseMessage.ValidationErrors.SKILL_REQUIRED;
    }

    if (!isEmpty(data.website)) {
        if (!Validator.isURL(data.website)) {
            errors.website = ResponseMessage.ValidationErrors.INVALID_URL;
        }
    }

    if (!isEmpty(data.youtube)) {
        if (!Validator.isURL(data.youtube)) {
            errors.youtube = ResponseMessage.ValidationErrors.INVALID_URL;
        }
    }

    if (!isEmpty(data.twitter)) {
        if (!Validator.isURL(data.twitter)) {
            errors.twitter = ResponseMessage.ValidationErrors.INVALID_URL;
        }
    }

    if (!isEmpty(data.facebook)) {
        if (!Validator.isURL(data.facebook)) {
            errors.facebook = ResponseMessage.ValidationErrors.INVALID_URL;
        }
    }

    if (!isEmpty(data.linkedin)) {
        if (!Validator.isURL(data.linkedin)) {
            errors.linkedin = ResponseMessage.ValidationErrors.INVALID_URL;
        }
    }

    if (!isEmpty(data.instagram)) {
        if (!Validator.isURL(data.instagram)) {
            errors.instagram = ResponseMessage.ValidationErrors.INVALID_URL;
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
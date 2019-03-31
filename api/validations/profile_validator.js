const Validator = require('validator');
import HelperValidator from './helper_validator';
import ResponseMessage from '../lib/constants';

module.exports = function validateProfileInput(data) {
    let errors = {};

    data.handle = !HelperValidator.isEmpty(data.handle) ? data.handle : '';
    data.status = !HelperValidator.isEmpty(data.status) ? data.status : '';
    data.skills = !HelperValidator.isEmpty(data.skills) ? data.skills : '';

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

    if (!HelperValidator.isEmpty(data.website)) {
        if (!Validator.isURL(data.website)) {
            errors.website = ResponseMessage.ValidationErrors.INVALID_URL;
        }
    }

    if (!HelperValidator.isEmpty(data.youtube)) {
        if (!Validator.isURL(data.youtube)) {
            errors.youtube = ResponseMessage.ValidationErrors.INVALID_URL;
        }
    }

    if (!HelperValidator.isEmpty(data.twitter)) {
        if (!Validator.isURL(data.twitter)) {
            errors.twitter = ResponseMessage.ValidationErrors.INVALID_URL;
        }
    }

    if (!HelperValidator.isEmpty(data.facebook)) {
        if (!Validator.isURL(data.facebook)) {
            errors.facebook = ResponseMessage.ValidationErrors.INVALID_URL;
        }
    }

    if (!HelperValidator.isEmpty(data.linkedin)) {
        if (!Validator.isURL(data.linkedin)) {
            errors.linkedin = ResponseMessage.ValidationErrors.INVALID_URL;
        }
    }

    if (!HelperValidator.isEmpty(data.instagram)) {
        if (!Validator.isURL(data.instagram)) {
            errors.instagram = ResponseMessage.ValidationErrors.INVALID_URL;
        }
    }

    return {
        errors,
        isValid: HelperValidator.isEmpty(errors)
    };
};
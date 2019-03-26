import HelperValidator from './helper_validator';
const Validator = require('validator');
import ResponseMessage from '../lib/constants';

module.exports = function validateExperienceInput(data) {
    let errors = {};

    data.school = !HelperValidator.isEmpty(data.school) ? data.school : '';
    data.degree = !HelperValidator.isEmpty(data.degree) ? data.degree : '';
    data.fieldOfStudy = !HelperValidator.isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : '';
    data.from = !HelperValidator.isEmpty(data.from) ? data.from : '';
    data.to = !HelperValidator.isEmpty(data.to) ? data.to : '';


    if (Validator.isEmpty(data.school)) {
        errors.school = ResponseMessage.ValidationErrors.SCHOOL_IS_REQUIRED;
    }

    if (Validator.isEmpty(data.degree)) {
        errors.degree = ResponseMessage.ValidationErrors.DEGREE_IS_REQUIRED;;
    }

    if (Validator.isEmpty(data.field_of_study)) {
        errors.field_of_study = ResponseMessage.ValidationErrors.STUDY_FIELD_IS_REQUIRED;
    }

    if (Validator.isEmpty(data.from)) {
        errors.from = ResponseMessage.ValidationErrors.FROM_DATE_IS_REQUIRED;
    }

    return {
        errors,
        isValid: HelperValidator.isEmpty(errors)
    };
};

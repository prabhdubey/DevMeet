import moment from 'moment';
import HelperValidator from './helper_validator';
const Validator = require('validator');
import ResponseMessage from '../lib/constants';

module.exports = function validateExperienceInput(data) {
    let errors = {};

    data.title = !HelperValidator.isEmpty(data.title) ? data.title : '';
    data.company = !HelperValidator.isEmpty(data.company) ? data.company : '';
    data.from = !HelperValidator.isEmpty(data.from) ? data.from : '';
    data.to = !HelperValidator.isEmpty(data.to) ? data.to : moment(moment.now()).format("YYYY-MM-DD");

    if (Validator.isEmpty(data.title)) {
        errors.title = ResponseMessage.ValidationErrors.JOB_TITLE_REQUIRED;
    }

    if (Validator.isEmpty(data.company)) {
        errors.company = ResponseMessage.ValidationErrors.COMPANY_REQUIRED;
    }

    if (Validator.isEmpty(data.from)) {
        errors.from = ResponseMessage.ValidationErrors.FROM_DATE_IS_REQUIRED;
    }

    if (!HelperValidator.checkDate(data.from, data.to)) {
        errors.date = ResponseMessage.ValidationErrors.INVALID_DATE
    }

    return {
        errors,
        isValid: HelperValidator.isEmpty(errors)
    };
};

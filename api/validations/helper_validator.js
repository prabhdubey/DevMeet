import moment from 'moment';

module.exports.isEmpty = function (value) {
    return value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0);
};

module.exports.checkDate = function (start, end) {
    let mStart = moment(start);
    let mEnd = moment(end);
    return mStart.isBefore(mEnd);
};

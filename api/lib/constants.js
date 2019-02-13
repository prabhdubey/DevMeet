exports.ResponseErrors = Object.freeze({
    EMAIL_ALREADY_EXISTS: 'Email already Exists',
    USER_NOT_FOUND: 'User not found',
    INVALID_USERNAME_PASSWORD: 'Invalid username and password',
    USER_PROFILE_NOT_FOUND: 'User not found'
});

exports.ResponseSuccess = Object.freeze({
    SUCCESSFULLY_SIGNED_IN: 'User successfully signed in'
});

exports.ValidationErrors = Object.freeze({
    NAME_VALIDATION: "Name must be between 2 and 10",
    NAME_EMPTY: 'Name is required',
    PASSWORD_EMPTY: 'Password is required',
    CONFIRMATION_PASSWORD_EMPTY: 'Confirm Password is required',
    EMAIL_VALIDATION: 'Email is invalid',
    PASSWORD_VALIDATION: "Name must be between 6 and 30",
    CONFIRMATION_PASSWORD_VALIDATION: "Passwords do not match",
});
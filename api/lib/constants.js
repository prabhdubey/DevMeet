exports.ResponseErrors = Object.freeze({
    EMAIL_ALREADY_EXISTS: 'Email already Exists',
    USER_NOT_FOUND: 'User not found',
    INVALID_USERNAME_PASSWORD: 'Invalid username and password',
    USER_PROFILE_NOT_FOUND: 'User Profile not found',
    HANDLE_ALREADY_EXISTS: 'Handle already exists',
    POST_NOT_FOUND: 'Post Not Found',
    POSTS_NOT_FOUND: 'Posts Not Found',
    UNAUTHORIZED_USER: 'User is unauthorized',
    ALREADY_LIKED_POST: 'User already liked the post',
    POST_NOT_LIKED_YET: 'Post is not liked yet',
    COMMENT_NOT_FOUND: 'Comment Not Found'
});

exports.ResponseSuccess = Object.freeze({
    SUCCESSFULLY_SIGNED_IN: 'User successfully signed in',
    POST_REMOVED_SUCCESSFULLY: 'Post is successfully deleted',
    POST_LIKED_SUCCESSFULLY: 'Post is liked successfully',
    POST_UNLIKED_SUCCESSFULLY: 'Post is unliked successfully',
    COMMENT_REMOVED_SUCCESSFULLY: 'Comment removed successfully'
});

exports.ValidationErrors = Object.freeze({
    NAME_VALIDATION: "Name must be between 2 and 10",
    NAME_EMPTY: 'Name is required',
    EMAIL_EMPTY: 'Email is required',
    PASSWORD_EMPTY: 'Password is required',
    CONFIRMATION_PASSWORD_EMPTY: 'Confirm Password is required',
    EMAIL_VALIDATION: 'Email is invalid',
    PASSWORD_VALIDATION: "Password must be between 6 and 30",
    CONFIRMATION_PASSWORD_VALIDATION: "Passwords do not match",
    HANDLE_LENGTH_VALIDATION: 'Handle needs to between 2 and 4 characters',
    HANDLE_REQUIRED: 'Profile handle is required',
    STATUS_REQUIRED: 'Status field is required',
    SKILL_REQUIRED: 'Skills field is required',
    INVALID_URL: 'Not a valid URL',
    JOB_TITLE_REQUIRED: 'Job title field is required',
    COMPANY_REQUIRED: 'Company field is required',
    FROM_DATE_IS_REQUIRED: 'From date field is required',
    INVALID_DATE: 'Invalid date start date is greater than end date',
    SCHOOL_IS_REQUIRED: 'School field is required',
    DEGREE_IS_REQUIRED: 'Degree field is required',
    STUDY_FIELD_IS_REQUIRED: 'Field of study field is required',
    POST_TEXT_LEN_VALIDATION: 'Post must be between 10 and 300 characters',
    POST_TEXT_REQUIRED: 'Text field is required'
});
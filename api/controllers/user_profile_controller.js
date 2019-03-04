import _ from 'underscore';
import validateProfileInput from '../validations/profile_validator';

/**
 * UserProfileController class containing user profile related actions
 */
export default class UserProfileController {
    constructor(userProfileService) {
        this.userProfileService = userProfileService;
        _.bindAll(this, 'getUserProfile', 'createUserProfile', 'getProfileUsingHandle');
    }

    /**
     * Method to get user profile using user id
     *
     * @param req Request
     * @param res Response
     */
    getUserProfile(req, res) {
        this.userProfileService.getUserProfile(req).then(userProfileResponse => {
            if (userProfileResponse.error) {
                return res.status(userProfileResponse.status).json(userProfileResponse);
            }
            return res.status(userProfileResponse.status).json(userProfileResponse);
        })
    }

    /**
     * Method to create user profile
     *
     * @param req Request
     * @param res Response
     */
    createUserProfile(req, res) {
        const { errors, isValid } = validateProfileInput(req.body);
        // Check Validation
        if (!isValid) {
            return res.status(400).json(errors);
        }
        this.userProfileService.createUserProfile(req).then(userProfileResponse => {
            if (userProfileResponse.error) {
                return res.status(userProfileResponse.status).json(userProfileResponse);
            }
            return res.status(userProfileResponse.status).json(userProfileResponse);
        })
    }

    /**
     * Method to get user profile using user handle
     *
     * @param req Request
     * @param res Response
     */
    getProfileUsingHandle(req, res) {
        this.userProfileService.profileUsingHandle(req).then(userProfileResponse => {
            if (userProfileResponse.error) {
                return res.status(userProfileResponse.status).json(userProfileResponse);
            }
            return res.status(userProfileResponse.status).json(userProfileResponse);
        })
    }
}
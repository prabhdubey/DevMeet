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

    getUserProfile(req, res) {
        this.userProfileService.getUserProfile(req).then(userProfileResponse => {
            if (userProfileResponse.error) {
                return res.status(userProfileResponse.status).json(userProfileResponse);
            }
            return res.status(userProfileResponse.status).json(userProfileResponse);
        })
    }

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

    getProfileUsingHandle(req, res) {
        this.userProfileService.profileUsingHandle(req).then(userProfileResponse => {
            if (userProfileResponse.error) {
                return res.status(userProfileResponse.status).json(userProfileResponse);
            }
            return res.status(userProfileResponse.status).json(userProfileResponse);
        })
    }
}
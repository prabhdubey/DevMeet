import _ from 'underscore';
import validateProfileInput from '../validations/profile_validator';
import validateExperienceInput from '../validations/experience_validator';

/**
 * UserProfileController class containing user profile related actions
 */
export default class UserProfileController {
    constructor(userProfileService) {
        this.userProfileService = userProfileService;
        _.bindAll(this, 'getUserProfile', 'createUserProfile', 'getProfileUsingHandle', 'getAllUserProfiles',
            'addUserExperience', 'removeUserExperience');
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
        const {errors, isValid} = validateProfileInput(req.body);
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

    /**
     * Method to get all user profiles
     *
     * @param req Request
     * @param res Response
     */
    getAllUserProfiles(req, res) {
        this.userProfileService.allUserProfiles().then(userProfileResponse => {
            if (userProfileResponse.error) {
                return res.status(userProfileResponse.status).json(userProfileResponse);
            }
            return res.status(userProfileResponse.status).json(userProfileResponse);
        })
    }

    /**
     * Method to add user experience
     *
     * @param req Request
     * @param res Response
     */
    addUserExperience(req, res) {
        const {errors, isValid} = validateExperienceInput(req.body);
        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }
        this.userProfileService.addUserExperience(req).then(userProfileResponse => {
            if (userProfileResponse.error) {
                return res.status(userProfileResponse.status).json(userProfileResponse);
            }
            return res.status(userProfileResponse.status).json(userProfileResponse);
        });
    }

    /**
     * Method to add user education
     *
     * @param req Request
     * @param res Response
     */
    addUserEducation(req,res) {
        const {errors, isValid} = validateExperienceInput(req.body);
        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }
        this.userProfileService.addUserExperience(req).then(userProfileResponse => {
            if (userProfileResponse.error) {
                return res.status(userProfileResponse.status).json(userProfileResponse);
            }
            return res.status(userProfileResponse.status).json(userProfileResponse);
        });
    }

    /**
     * Method to remove user experience
     *
     * @param req Request
     * @param res Response
     */
    removeUserExperience(req, res) {
        this.userProfileService.removeUserExperience(req).then(userProfileResponse => {
            if (userProfileResponse.error) {
                return res.status(userProfileResponse.status).json(userProfileResponse);
            }
            return res.status(userProfileResponse.status).json(userProfileResponse);
        });
    }
}
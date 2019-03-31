import _ from 'underscore';
import validateProfileInput from '../validations/profile_validator';
import validateExperienceInput from '../validations/experience_validator';
import validateEducationInput from '../validations/education_validator';

/**
 * UserProfileController class containing user profile related actions
 */
export default class UserProfileController {
    constructor(userProfileService) {
        this.userProfileService = userProfileService;
        _.bindAll(this, 'getUserProfile', 'createUserProfile', 'getProfileUsingHandle', 'getAllUserProfiles',
            'addUserExperience', 'addUserEducation', 'removeUserExperience', 'removeUserEducation',
            'getCurrentUserProfile', 'deleteCurrentUserProfile'
        );
    }

    /**
     * Method to get current user profile
     *
     * @param req Request
     * @param res Response
     */
    getCurrentUserProfile(req, res) {
        this.userProfileService.getCurrentUserProfile(req).then(userProfileResponse => {
            if (userProfileResponse.errors) {
                return res.status(userProfileResponse.status).json(userProfileResponse);
            }
            return res.status(userProfileResponse.status).json(userProfileResponse);
        })
    }

    /**
     * Method to delete current user profile
     *
     * @param req Request
     * @param res Response
     */
    deleteCurrentUserProfile(req, res) {
        this.userProfileService.deleteCurrentUserProfile(req).then(userProfileResponse => {
            if (userProfileResponse.errors) {
                return res.status(userProfileResponse.status).json(userProfileResponse);
            }
            return res.status(userProfileResponse.status).json(userProfileResponse);
        })
    }


    /**
     * Method to get user profile using user id
     *
     * @param req Request
     * @param res Response
     */
    getUserProfile(req, res) {
        this.userProfileService.getUserProfile(req).then(userProfileResponse => {
            if (userProfileResponse.errors) {
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
            if (userProfileResponse.errors) {
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
            if (userProfileResponse.errors) {
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
            if (userProfileResponse.errors) {
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
            if (userProfileResponse.errors) {
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
    addUserEducation(req, res) {
        const {errors, isValid} = validateEducationInput(req.body);
        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }
        this.userProfileService.addUserEducation(req).then(userProfileResponse => {
            if (userProfileResponse.errors) {
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
            if (userProfileResponse.errors) {
                return res.status(userProfileResponse.status).json(userProfileResponse);
            }
            return res.status(userProfileResponse.status).json(userProfileResponse);
        });
    }

    removeUserEducation(req, res) {
        this.userProfileService.removeUserEducation(req).then(userProfileResponse => {
            if (userProfileResponse.errors) {
                return res.status(userProfileResponse.status).json(userProfileResponse);
            }
            return res.status(userProfileResponse.status).json(userProfileResponse);
        });
    }
}
import ResponseMessage from "../lib/constants";
import _ from 'underscore';
import * as Response from "../lib/response";
import HelperValidator from "../validations/helper_validator";
import User from '../models/user';
import moment from "moment";

/**
 * User Profile Service class to hold business logic
 */
export default class UserProfileService {
    constructor(model) {
        this._model = model;
        _.bindAll(this, 'getUserProfile', 'profileFields', 'createUserProfile', 'profileUsingHandle', 'allUserProfiles',
            'addUserExperience', 'addUserEducation', 'removeUserExperience', 'removeUserEducation', 'getCurrentUserProfile',
            'deleteCurrentUserProfile');
    }

    /**
     * Method to get current user profile
     *
     * @param req Request
     *
     * @returns {Promise<any | {data: *, msg: *, error: *}>}
     */
    getCurrentUserProfile(req) {
        return this._model.findOne({user: req.user.id})
            .populate('user', ['name', 'avatar', 'name'])
            .then(profile => {
                if (!profile) {
                    return Response.createResponse(
                        null,
                        null,
                        {email: ResponseMessage.ResponseErrors.USER_PROFILE_NOT_FOUND},
                        404);
                }
                return Response.createResponse(profile);
            })
            .catch(err => {
                return Response.createResponse(null, null, err, 400);
            })
    }

    /**
     * Method to delete current user profile
     *
     * @param req Request
     *
     * @returns {Promise<any | {data: *, msg: *, error: *}>}
     */
    deleteCurrentUserProfile(req) {
        return this._model.findOneAndRemove({user: req.user.id})
            .then(() => {
                return User.findOneAndRemove({_id: req.user.id})
                .then(() =>{
                    return Response.createResponse(null, ResponseMessage.ResponseSuccess.ACCOUNT_DELETED_SUCCESSFULLY);
                })
            })
            .catch(err => {
                return Response.createResponse(null, null, err, 400);
            })
    }


    /**
     * Method to get user profile
     *
     * @param req Request
     *
     * @returns {Promise<any | {data: *, msg: *, error: *}>}
     */
    getUserProfile(req) {
        return this._model.findOne({user: req.params.user_id})
            .then(profile => {
                if (!profile) {
                    return Response.createResponse(null, null, ResponseMessage.ResponseErrors.USER_PROFILE_NOT_FOUND, 404);
                }
                return Response.createResponse(profile);
            })
            .catch(err => {
                return Response.createResponse(null, null, err, 400);
            })
    }

    /**
     * Method to create user profile
     *
     * @param req Request
     *
     * @returns {Promise}
     */
    createUserProfile(req) {
        // Get fields
        const profileFields = this.profileFields(req);

        return this._model.findOneAndUpdate({user_id: req.user.id}, profileFields, {new: true})
            .then(profile => {
                if (profile) {
                    return Response.createResponse(profile)
                }
                return this._model.findOne({handle: profileFields.handle})
                    .then(profile => {
                        if (profile) {
                            return Response.createResponse(null, null, ResponseMessage.ResponseErrors.HANDLE_ALREADY_EXISTS, 400);
                        }
                        return new this._model(profileFields).save().then(profile => {
                            return Response.createResponse(profile);
                        })
                            .catch(err => console.log(err));
                    })
            })

    }

    /**
     * Method to get profile using user handle
     *
     * @param req Request
     *
     * @returns {Promise}
     */
    profileUsingHandle(req) {
        return this._model.findOne({handle: req.params.handle})
            .populate('user', ['email', 'avatar', 'name'])
            .then((profile) => {
                if (profile) {
                    return Response.createResponse(profile);
                }
                return Response.createResponse(null, null, ResponseMessage.ResponseErrors.USER_PROFILE_NOT_FOUND, 404);
            })
    }

    /**
     * Method to get all user profiles
     *
     * @returns {Promise}
     */
    allUserProfiles() {
        return this._model.find()
            .populate('user', ['email', 'avatar', 'name'])
            .then(profiles => {
                if (profiles) {
                    return Response.createResponse(profiles);
                }
                return Response.createResponse(null, null, ResponseMessage.ResponseErrors.USER_PROFILE_NOT_FOUND, 404);
            })
    }

    /**
     * Method to add user experience
     *
     * @param req Request
     *
     * @returns {Promise}
     */
    addUserExperience(req) {
        return this._model.findOne({user: req.user.id})
            .then(profile => {
                if (profile) {
                    const newExp = {
                        title: req.body.title,
                        company: req.body.company,
                        location: req.body.location,
                        from: req.body.from,
                        to: req.body.to,
                        current: req.body.current,
                        description: req.body.description
                    };

                    // Add to exp array
                    profile.experience.unshift(newExp);
                    return profile.save()
                        .then(profile => {
                            return Response.createResponse(profile);
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            })
            .catch(err => console.log(err));
    }

    /**
     * Method to add user experience
     *
     * @param req Request
     *
     * @returns {Promise}
     */
    addUserEducation(req) {
        return this._model.findOne({user: req.user.id})
            .then(profile => {
                if (profile) {
                    const newEdu = {
                        school: req.body.school,
                        degree: req.body.degree,
                        field_of_study: req.body.fieldOfStudy,
                        from: req.body.from,
                        to: req.body.to,
                        current: req.body.current,
                        description: req.body.description
                    };
                    // Add to exp array
                    profile.education.unshift(newEdu);
                    return profile.save()
                        .then(profile => {
                            return Response.createResponse(profile);
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            })
            .catch(err => console.log(err));
    }

    /**
     * Method to remove user experience
     *
     * @param req Request
     *
     * @returns {Promise}
     */
    removeUserExperience(req) {
        return this._model.findOne({user: req.user.id})
            .then(profile => {
                if (profile) {
                    const indexToBeRemoved = profile.experience
                        .map(item => item.id)
                        .indexOf(req.params.exp_id);

                    // splice out of array
                    profile.experience.splice(indexToBeRemoved, 1);

                    return profile.save().then(profile => {
                        return Response.createResponse(profile);
                    })
                }
                return Response.createResponse(null, null, ResponseMessage.ResponseErrors.USER_PROFILE_NOT_FOUND, 404);
            })
            .catch(err => console.log(err));
    }

    /**
     * Method to remove user experience
     *
     * @param req Request
     *
     * @returns {Promise}
     */
    removeUserExperience(req) {
        return this._model.findOne({user: req.user.id})
            .then(profile => {
                if (profile) {
                    const indexToBeRemoved = profile.experience
                        .map(item => item.id)
                        .indexOf(req.params.exp_id);

                    // splice out of array
                    profile.experience.splice(indexToBeRemoved, 1);

                    return profile.save().then(profile => {
                        return Response.createResponse(profile);
                    })
                }
                return Response.createResponse(null, null, ResponseMessage.ResponseErrors.USER_PROFILE_NOT_FOUND, 404);
            })
            .catch(err => console.log(err));
    }
    /**
     * Method to remove user education
     *
     * @param req Request
     *
     * @returns {Promise}
     */
    removeUserEducation(req) {
        return this._model.findOne({user: req.user.id})
            .then(profile => {
                if (profile) {
                    const indexToBeRemoved = profile.education
                        .map(item => item.id)
                        .indexOf(req.params.edu_id);

                    // splice out of array
                    profile.education.splice(indexToBeRemoved, 1);

                    return profile.save().then(profile => {
                        return Response.createResponse(profile);
                    })
                }
                return Response.createResponse(null, null, ResponseMessage.ResponseErrors.USER_PROFILE_NOT_FOUND, 404);
            })
            .catch(err => console.log(err));
    }


    /**
     * Create user profile attributes
     *
     * @param req Request
     */
    profileFields(req) {
        const profileFields = {};
        profileFields.user = req.user.id;
        if (req.body.handle) profileFields.handle = req.body.handle;
        if (req.body.company) profileFields.company = req.body.company;
        if (req.body.website) profileFields.website = req.body.website;
        if (req.body.location) profileFields.location = req.body.location;
        if (req.body.bio) profileFields.bio = req.body.bio;
        if (req.body.status) profileFields.status = req.body.status;
        if (req.body.githubusername)
            profileFields.github_username = req.body.githubusername;
        // Skills - Spilt into array
        if (typeof req.body.skills !== 'undefined') {
            profileFields.skills = req.body.skills.split(',');
        }

        // Social
        profileFields.social = {};
        if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
        if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
        if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
        if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
        if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

        return profileFields;
    }
}
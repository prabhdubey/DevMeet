import ResponseMessage from "../lib/constants";
import _ from 'underscore';
import * as Response from "../lib/response";
import HelperValidator from "../validations/helper_validator";
import moment from "moment";

/**
 * User Profile Service class to hold business logic
 */
export default class UserProfileService {
    constructor(model) {
        this._model = model;
        _.bindAll(this, 'getUserProfile', 'profileFields', 'createUserProfile', 'profileUsingHandle', 'allUserProfiles',
            'addUserExperience');
    }

    getUserProfile(req) {
        return this._model.findOne({user: req.params.user_id})
            .then(profile => {
                if (!profile) {
                    return Response.createResponse(null, null, ResponseMessage.ResponseErrors.USER_PROFILE_NOT_FOUND, 404);
                }
                return Response.createResponse(profile, null, null);
            })
            .catch(err => {
                return Response.createResponse(null, null, err, 400);
            })
    }

    createUserProfile(req) {
        // Get fields
        const profileFields = this.profileFields(req);
        return this._model.findOneAndUpdate({user_id: req.body.user_id}, profileFields, {new: true})
            .then(profile => {
                if (profile) {
                    console.log(profile);
                    return Response.createResponse(profile, null, null)
                }
                return this._model.findOne({handle: profileFields.handle})
                    .then(profile => {
                        if (profile) {
                            return Response.createResponse(null, null, ResponseMessage.ResponseErrors.HANDLE_ALREADY_EXISTS, 400);
                        }
                        return new this._model(profileFields).save().then(profile => {
                            return Response.createResponse(profile, null, null);
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
            .populate('user', ['email', 'avatar'])
            .then((profile) => {
                if (profile) {
                    return Response.createResponse(profile, null, null);
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
            .populate('user', ['email', 'avatar'])
            .then(profiles => {
                if (profiles) {
                    return Response.createResponse(profiles, null, null);
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
        return this._model.findOne({user: req.user_id})
            .then(profile => {
                req.body.to = !HelperValidator.isEmpty(req.body.to) ? req.body.to : moment(moment.now()).format("YYYY-MM-DD");
                if (profile) {
                    console.log(req.body.to);
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
            profileFields.githubusername = req.body.githubusername;
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
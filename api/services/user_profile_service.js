import ResponseMessage from "../lib/constants";
import _ from 'underscore';
import * as Response from "../lib/response";

/**
 * User Profile Service class to hold business logic
 */
export default class UserProfileService {
    constructor(model) {
        this._model = model;
        _.bindAll(this, 'getUserProfile');
    }

    getUserProfile(req) {
        return this._model.findOne({user_id: req.params.user_id})
            .then(profile => {
                if (!profile) {
                   return  Response.createResponse(null, null, ResponseMessage.ResponseErrors.USER_PROFILE_NOT_FOUND, 404);
                }
                return Response.createResponse(profile, null, null);
            })
            .catch(err => {
               return Response.createResponse(null, null, err, 400);
            })
    }
}
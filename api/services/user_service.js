import ResponseMessage from "../lib/constants";
import _ from 'underscore';
import gravatar from 'gravatar';;
import * as Response from "../lib/response";
import jwt from 'jsonwebtoken';

/**
 * User Service class to hold business logic
 */
export default class UserService {
    constructor(model) {
        this._model = model;
        _.bindAll(this, 'register', 'createNewUser', 'login', 'currentUser');
    }

    /**
     * Register method to save user if not created
     *
     * @param req Request
     *
     * @returns {Promise}
     */
    register(req) {
        return this._model.findOne({email: req.body.email})
            .then(user => {
                if (user) {
                    return Response.createResponse(null, null, ResponseMessage.ResponseErrors.EMAIL_ALREADY_EXISTS);
                }
                try {
                    return this.createNewUser(req).then((user) => {
                        return Response.createResponse(user);
                    });
                }
                catch (err) {
                    return Response.createResponse(null, null, err);
                }
            });
    }

    /**
     * Login method to validate user and return JWT token if user successfully signs in
     *
     * @param req Request
     *
     * @returns {Promise}
     */
    login(req) {
        const email = req.body.email;
        const password = req.body.password;
        return this._model.findOne({email: email})
            .then(async (user) => {
                if (!user) {
                    return Response.createResponse(null, null, ResponseMessage.ResponseErrors.USER_NOT_FOUND, 404);
                }
                if (await user.isPasswordValid(password)) {
                    return Response.createResponse(
                        {user_id: user.id, 'token': 'Bearer ' + this.getToken(user)},
                        ResponseMessage.ResponseSuccess.SUCCESSFULLY_SIGNED_IN,
                        null
                    )
                }
                return Response.createResponse(null, null, ResponseMessage.ResponseErrors.INVALID_USERNAME_PASSWORD, 400);
            })
    }

    /**
     * Current User method to return current user if authentication passes
     *
     * @param req Request
     *
     * @returns {{data: *, msg: *, error: *}}
     */
    async currentUser(req) {
        return Response.createResponse({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        })
    }

    // Helper Methods

    /**
     * CreateNewUser method to create new user for the given attributes
     *
     * @param req Request
     *
     * @returns {Promise<T>}
     */
    async createNewUser(req) {
        const avatar = gravatar.url(
            req.body.email, {
                s: process.env.PROFILE_IMAGE_SIZE,
                r: process.env.IMAGE_RATING,
                d: process.env.DEFAULT_IMAGE
            });
        const newUser = new this._model({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            avatar
        });
        return await newUser.save()
            .then((user) => {
                return user;
            })
            .catch((err) => {
                throw err;
            });
    }

    /**
     * GetToken method to get JWT token for the given user
     *
     * @param user User Instance
     *
     * @returns string
     */
    getToken(user) {
        const payload = {id: user.id, name: user.name, avatar: user.avatar};
        return jwt.sign(
            payload,
            process.env.SECRET_OR_KEY,
            {expiresIn: parseInt(process.env.TOKEN_EXPIRE_TIME)}
        );
    }
}
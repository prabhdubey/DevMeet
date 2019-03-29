import _ from 'underscore';
import validateRegisterInput from '../validations/register_validator';
import validateLoginInput from '../validations/login_validator';
import * as Response from "../lib/response";

/**
 * UserController class containing user related actions
 */
export default class UserController {
    constructor(userService) {
        this.userService = userService;
        _.bindAll(this, 'register', 'login', 'current');
    }

    /**
     * Register method to successfully register user
     *
     * @param req Request
     * @param res Response
     */
    register(req, res) {
        // Request validation
        const {errors, isValid} = validateRegisterInput(req.body);
        if (!isValid) {
            return res.status(400).json(Response.createResponse(null, null, errors, 400))
        }
        this.userService.register(req).then((userRegistrationResponse) => {
            if (userRegistrationResponse.errors) {
                return res.status(userRegistrationResponse.status).json(userRegistrationResponse);
            }
            return res.json(userRegistrationResponse);
        });
    }

    /**
     * Login method to successfully login user
     *
     * @param req Request
     * @param res Response
     */
    login(req, res) {
        // Request validation
        const {errors, isValid} = validateLoginInput(req.body);
        if (!isValid) {
            return res.status(400).json(Response.createResponse(null, null, errors, 400))
        }
        this.userService.login(req).then((userLoginResponse) => {
            if (userLoginResponse.errors) {
                return res.status(userLoginResponse.status).json(userLoginResponse);
            }
            return res.json(userLoginResponse);
        });
    }

    current(req, res) {
        this.userService.currentUser(req).then(currentUserResponse => {
            if (currentUserResponse.errors) {
                return res.status(currentUserResponse.status).json(currentUserResponse);
            }
            return res.json(currentUserResponse);
        })
    }
}
import _ from 'underscore';
import validateRegisterInput from '../validations/register_validator';
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
            return res.status(400).json(Response.createResponse(null, null, errors))
        }
        this.userService.register(req).then((userRegistrationResponse) => {
            if (userRegistrationResponse.error) {
                return res.status(400).json(userRegistrationResponse);
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
        this.userService.login(req).then((userLoginResponse) => {
            if (userLoginResponse.error) {
                return res.status(404).json(userLoginResponse);
            }
            return res.json(userLoginResponse);
        });
    }

    current(req, res) {
        this.userService.currentUser(req).then(currentUserResponse => {
            if (currentUserResponse.error) {
                return res.status(400).json(currentUserResponse);
            }
            return res.json(currentUserResponse);
        })
    }
}
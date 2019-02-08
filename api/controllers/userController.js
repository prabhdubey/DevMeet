import _ from 'underscore';

/**
 * UserController class containing user related actions
 */
export default class UserController {
    constructor(userService) {
        this.userService = userService;
        _.bindAll(this, 'register', 'login');
    }

    /**
     * Register method to successfully register user
     *
     * @param req Request
     * @param res Response
     */
    register(req, res) {
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
        this.userService.login(req).then((userLoginResponse)=> {
            if (userLoginResponse.error) {
                return res.status(404).json(userLoginResponse);
            }
            return res.json(userLoginResponse);
        });
    }
}
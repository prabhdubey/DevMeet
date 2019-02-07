import _ from 'underscore';

export default class UserController {
    constructor(userService) {
        this.userService = userService;
        _.bindAll(this, 'register');
    }

    register(req, res) {
        this.userService.register(req).then((userRegistrationResponse) => {
            if (userRegistrationResponse.error) {
                return res.status(400).json(userRegistrationResponse);
            }
            return res.json(userRegistrationResponse);
        });
    }

    login(req, res) {
        this.userService.login(req).then((userLoginResponse)=> {
            if (userLoginResponse.error) {
                return res.status(404).json(userLoginResponse);
            }
            return res.json(userLoginResponse);
        });
    }
}
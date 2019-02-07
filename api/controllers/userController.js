import _ from 'underscore';

export default class UserController {
    constructor(userService) {
        this.userService = userService;
        _.bindAll(this, 'register');
    }

    register(req, res) {
        this.userService.register(req).then((userRegisterResponse) => {
            console.log(userRegisterResponse);
            if (userRegisterResponse.error) {
                return res.status(400).json(userRegisterResponse)
            }
            return res.json(userRegisterResponse);
        });
    }
}
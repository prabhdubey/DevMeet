import Errors from "../lib/constants";
import _ from 'underscore';
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';

export default class UserService {
    constructor(model) {
        this._model = model;
        _.bindAll(this, 'register', 'generatePassword', 'createNewUser');
    }

    register(req) {
        return this._model.findOne({email: req.body.email})
            .then(user => {
                if (user) {
                    return {'error': Errors.ResponseErrors.EMAIL_ALREADY_EXISTS};
                }
                try {
                    return this.createNewUser(req).then((user) => {
                        return {'data': user, 'error': null};
                    });
                }
                catch (err) {
                    return {'data': null, 'error': err};
                }
            });
    }

    createNewUser(req) {
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
        try {
            newUser.password = this.generatePassword(newUser);
            return newUser.save()
                .then((user) => {
                    return user;
                })
                .catch((err) => {
                    throw err;
                });

        }
        catch (err) {
            throw err;
        }

    }

    generatePassword(newUser) {
        return bcrypt.genSaltSync(parseInt(process.env.PASSWORD_HASH_LEN), (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                console.log('error', err);
                console.log('hash', hash);
                if (err) throw err;
                return hash;
            })
        })
    }
}
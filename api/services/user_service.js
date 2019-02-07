import Errors from "../lib/constants";
import _ from 'underscore';
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import * as Respone from "../lib/response";
import jwt from 'jsonwebtoken';

export default class UserService {
    constructor(model) {
        this._model = model;
        _.bindAll(this, 'register', 'generatePassword', 'createNewUser');
    }

    register(req) {
        return this._model.findOne({email: req.body.email})
            .then(user => {
                if (user) {
                    return Respone.createResponse(null, null, Errors.ResponseErrors.EMAIL_ALREADY_EXISTS);
                }
                try {
                    return this.createNewUser(req).then((user) => {
                        return Respone.createResponse(user);
                    });
                }
                catch (err) {
                    return Respone.createResponse(null, null, err);
                }
            });
    }

    login(req) {
        const email = req.body.email;
        const password = req.body.password;
        return this._model.findOne({email: email})
            .then((user) => {
                if (!user) {
                    Respone.createResponse(null, null, Errors.ResponseErrors.USER_NOT_FOUND);
                }
                this.comparePassword(password, user)
                    .then((isMatch) => {
                        if (!isMatch) {
                          return  Respone.createResponse(null, null, Errors.ResponseErrors.USER_NOT_FOUND);
                        }
                        console.log(this.getToken(user));
                    })
            })
    }

    getToken(user) {
        const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar
        };
        jwt.sign(
          payload, process.env.SECRET_OR_KEY
        )
    }

    comparePassword(password, user) {
        return bcrypt.compare(password, user.password)
            .then(isMatch => {
                return isMatch
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
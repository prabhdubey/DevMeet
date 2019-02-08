import PassportJwt from 'passport-jwt';
import User from '../models/user';

const opts = {};
opts.jwtFromRequest = PassportJwt.ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_OR_KEY;

module.exports = passport => {
    passport.use(new PassportJwt.Strategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err))
        })
    )
};


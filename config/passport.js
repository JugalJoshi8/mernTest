const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('user');
const keys = require('./keys');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretKey;
module.exports = passport => {
    passport.use(new JwtStrategy(options, (jwtPayload, done) => {
        User.findById(jwtPayload.id).then((user) => {
            if(user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        })
    }))
}
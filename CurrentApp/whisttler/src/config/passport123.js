const passport = require('passport');
const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;
const User = require('../models/users.model');
var consts = require('../constants/statusMessage');
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, cb) {

    return User.findOne({
        username
      })
      .then(user => {

        if (!user) {
          return cb(null, false, consts.WRONG_CREDENTIALS);
        } else {
          var valid = user.comparePassword(password, user.password);
          if (valid) {
            return cb(null, user, {
              message: 'Logged In Successfully'
            });
          } else {

            cb(null, false, consts.WRONG_CREDENTIALS);
          }

        }
      })
      .catch(err => {
        return cb(err);
      });
  }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'whisttler'
  },
  function(jwtPayload, cb) {
    return User.findOne({
        _id: jwtPayload._id
      }).select('_id role')
      .then(user => {

        return cb(null, user);
      })
      .catch(err => {
        return cb(err);
      });
  }
));

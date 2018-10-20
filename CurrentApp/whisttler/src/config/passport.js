//passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;   
const User = require('../models/users.model');
/*
passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    function (username, password, donr) {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        User.findOne({
          username: username
        }, function(err,doc) {

          if (err) {
            done(err);
          }
           else {
            if (doc) {

              var valid = doc.comparePassword(password, doc.password);
              console.log(valid+"valid");
              if (valid) {
                done(null, {
                  userid: doc._id,
                  role:doc.role
              });
            } else {
              done(err);
            }
          }
        }

        });
    }
));*/




module.exports = function(passport) {

  passport.serializeUser((user, done) => {
    done(null, {'_id':user._id,'role':user.role});
  });


  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(new LocalStrategy(function(username, password, done) {
    User.findOne({
      username: username
    }, function(err,doc) {

      if (err) {
        done(err);
      }
       else {
        if (doc) {

          var valid = doc.comparePassword(password, doc.password);
          console.log(valid+"valid");
          if (valid) {
            done(null, {
              userid: doc._id,
              role:doc.role
          });
        } else {
          done(err);
        }
      }
    }

    });
  }));


}

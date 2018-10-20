const express = require('express');
const mongoose = require('mongoose');
const authRouter = express.Router();
const User = require('../models/users.model');
require('../config/dbconnection');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const authModule = require("../modules/auth/auth.module");
passport.serializeUser((user, done) => {
  done(null, {
    '_id': user._id,
    'role': user.role
  });
});


passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({
    username: username
  }, function(err, doc) {

    if (err) {
      done(err);
    } else {
      if (doc) {

        var valid = doc.comparePassword(password, doc.password);
        console.log(valid + "valid");
        if (valid) {
          done(null, {
            _id: doc._id,
            role: doc.role
          });
        } else {
          done(err);
        }
      }
    }

  });
}));

module.exports = function(passport) {

authRouter.post('/login',passport.authenticate('local',{failureRedirect:'/error'}), function(req, res, next) {
            res.json({user:req.user});
});

  authRouter.post('/signUp', authModule.signUp);
  authRouter.get('/logout', authModule.logout);
  authRouter.post('/checkusername', authModule.checkusername);
  authRouter.post('/resendOtp', authModule.resend_OTP_mobileno);
  authRouter.post('/verifyOtp', authModule.verify_OTP_mobileno);
  return authRouter;
}




/*
  authRouter.route('/profile').get((req,res)=>{
    console.log("profile");
    console.log(req.user);
    res.send("profile");
  });

*/

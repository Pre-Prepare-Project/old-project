const express = require('express');
const mongoose = require('mongoose');
var User = require('../../models/users.model');
var mobileotp = require('../../models/mobileOtp.model');
var campaign = require('../../models/campaigns.model');
var influencer = require('../../models/influencer.models');
var brand = require('../../models/brands.model');

require('../../config/dbconnection');
const manageSignUpModule = require('./manageSignUp.module');
var consts = require('../../constants/statusMessage');

var signup = function(req, res) {
  var body = req.body,
    username = body.username;
  //promisses start
  manageSignUpModule.checkusername(body)
    .then(function(result) {
      if (result) {

        return res.status(400).json(consts.USER_ALREADY_EXIST);

      } else {
        return manageSignUpModule.check_user_email(body).then(function(result) {

          if (result) {
            return res.status(400).json(consts.EMAIL_ALREADY_EXIST);
          } else {
            return manageSignUpModule.check_user_mobileno(body).then(function(result) {
              if (result) {
                res.status(400).json(consts.PHONE_ALREADY_EXIST);
              } else {
                return manageSignUpModule.save_user_data(body).then(function(user) {

                  if (user.role == 'influencer') {
                    return manageSignUpModule.storeInfluencerProfile(user, body).then(function(user) {

                      return manageSignUpModule.send_mobile_otp(user, body).then(function(user) {
                        return manageSignUpModule.send_email_verification(user, body).then(function(result) {
                          res.status(200).json(result);
                        });
                      });
                    });

                  } else if (user.role == 'brand') {
                    return manageSignUpModule.storeBrandProfile(user, body).then(function(user) {
                      console.log("hii");
                      return manageSignUpModule.send_mobile_otp(user, body).then(function(user) {
                        return manageSignUpModule.send_email_verification(user, body).then(function(result) {
                          res.status(200).json(result);
                        });
                      });
                    });

                  }

                });
              }
            });
          }
        });
      }
    })
    .catch(function() {
      res.status(500).json(consts.ERROR_500);
    });

}


var logout = function() {
  req.logout();
  res.redirect('/');
}

var checkusername = function(req, res) {
  var body = req.body;
  manageSignUpModule.checkusername(body)
    .then(function(result) {
      if (result) {
        res.status(400).json(consts.USER_ALREADY_EXIST);
      } else {
        res.status(200).json({
          message: "valid Username"
        });
      }
    }).catch(function() {
      res.json(dberror);
    });

};

var resend_OTP_mobileno = function(req, res) {

  if (req.body.user_id) {
    mobileotp.findOneAndUpdate({
      user_id: req.body.user_id,
      active: 0,
      throughApi: "signUp"
    }, {
      active: -1
    }, function(err, doc) {

      if (err) {
        res.status(500).json(consts.ERROR_500);
      } else if (doc) {
        var record = new mobileotp();
        record.user_id = doc.user_id;
        if (req.body.newmob == 0) {
          record.mobileno = doc.mobileno;
        } else if (req.body.newmob == 1) {
          record.mobileno = req.body.mob;
        } else {
          res.status(500).json(consts.ERROR_500);
        }
        record.otp = 4478,
          record.throughApi = req.body.throughApi;
        record.save(function(err, doc) {
          if (err) {
            res.status(500).json(consts.ERROR_500);
          } else {
            res.status(200).json({
              message: "OTP Resend"
            });
          }
        });
      }

    });
  } else {
    res.status(403).json(consts.ERROR_403);
  }
};

var verify_OTP_mobileno = function(req, res) {
  if (req.body.user_id) {


    mobileotp.findOne({
      user_id: req.body.user_id,
      active: 0,
      mobileno: req.body.mob,
      throughApi: "signUp"
    }, function(err, doc) {
      if (err) {
        res.status(500).json(consts.ERROR_500);
      } else if (doc) {
        if (req.body.otp == doc.otp) {
          mobileotp.findOneAndUpdate({
            _id: doc._id
          }, {
            active: 1
          }, function(err, doc) {
            if (err) res.status(500).json(consts.ERROR_500);
            else {
              User.findOne({
                _id: req.body.user_id
              }, ('_id role'), function(err, doc) {
                if (err) {
                  res.status(500).json(consts.ERROR_500);
                } else {
                  if (doc.role == consts.brand) {
                    brand.update({
                      user_id: doc._id
                    }, {
                      $set: {
                        'profile.mob': req.body.mob
                      }
                    }, function(err, doc) {
                      if (err) {
                        res.status(500).json(consts.ERROR_500);
                      } else {
                        res.status(200).json({
                          message: "Otp Verified Sucessfully"
                        });
                      }

                    });
                  } else if (doc.role == consts.influencer) {
                    influencer.update({
                      user_id: doc._id
                    }, {
                      $set: {
                        'profile.mob': req.body.mob
                      }
                    }, function(err, doc) {
                      if (err) {
                        res.status(500).json(consts.ERROR_500);
                      } else {
                        res.status(200).json({
                          message: "Otp Verified Sucessfully"
                        });
                      }

                    });
                  }
                }
              });
            }
          });

        } else {
          res.status(400).json({
            message: "Wrong Otp"
          });
        }
      } else {
        res.status(400).json({
          message: "NO OTP EXIST"
        });
      }
    });
  } else {
    res.status(403).json(consts.ERROR_403);
  }

}


module.exports = {
  signUp: signup,
  logout: logout,
  checkusername: checkusername,
  resend_OTP_mobileno: resend_OTP_mobileno,
  verify_OTP_mobileno: verify_OTP_mobileno
};

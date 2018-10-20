const express = require('express');
const mongoose = require('mongoose');
var influencer = require('../../models/influencer.models');
var User = require('../../models/users.model');
var mobileotp = require('../../models/mobileOtp.model');
var emailVerify = require('../../models/emailVerify.model');
var brand = require('../../models/brands.model');
require('../../config/dbconnection');
var Promise = require('promise');

let storeInfluencerProfile = function(user, body) {
  return new Promise(function(resolve, reject) {

    var record = new influencer();

    record.user_id = user._id;
    record.profile.firstname = body.firstname;
    record.profile.gender = body.gender ;
    record.profile.lastname = body.lastname;
    record.profile.Address.add1=body.address1;
    record.profile.Address.add2=body.address2;
    record.profile.Address.city=body.city;
    record.profile.Address.district=body.district;
    record.profile.Address.pinCode=body.pinCode;

    //record.profile.age=body.age;
    record.save(function(err, doc) {
      console.log(err);
      if (err) {
        reject();
      } else {
        resolve(user);
      }
    });
  });
};

let storeBrandProfile = function(user, body) {
  return new Promise(function(resolve, reject) {
    var record = new brand();
    record.user_id = user._id;
    record.name = body.username;
    record.comapanyname = body.companyname;

    record.profile.Address.add1=body.address1;
    record.profile.Address.add2=body.address2;
    record.profile.Address.city=body.city;
    record.profile.Address.district=body.district;
    record.profile.Address.pinCode=body.pinCode;
    record.Domain=body.domain;

    //record.profile.age=body.age;
    record.save(function(err, doc) {

      if (err) {
        reject();
      } else {
        resolve(user);
      }
    });
  });
};

let send_email_verification = function(user, body) {
  return new Promise(function(resolve, reject) {

    var record = new emailVerify();
    record.user_id = user._id,
      record.email = body.email,
      record.url = "abc",
      record.througApi = "SignUp";
    record.save(function(err, doc) {

      if (err) {
        reject();
      } else {
        resolve({message:"done",user:user._id});
      }
    });
  });

};
let save_user_data = function(body) {
  return new Promise(function(resolve, reject) {
    var record = new User();
    record.username = body.username,
      record.password = record.hashPassword(body.password),
      record.role = body.role;
    record.save(function(err, user) {
      if (err) reject();
      else {
        resolve(user);
      }
    });

  });

};


let send_mobile_otp = function(user, body) {
  return new Promise(function(resolve, reject) {

    var record = new mobileotp();
    record.user_id = user._id,
      record.mobileno = body.mob,
      record.otp = 4478,
      record.throughApi = "signUp";
    record.save(function(err, doc) {
      if (err) {
        console.log(err);
        reject();
      } else {
        resolve(user);
      }
    });
  });

};

let checkusername = function(body) {
  var username = body.username;
  return new Promise(function(resolve, reject) {
    User.findOne({
      username: username
    }, function(err, doc) {
      if (err) {
        reject();
      } else {

        if (doc) resolve(1);
        else resolve(0);
      }
    });
  });
};

let check_user_email = function(body) {
  email = body.email;

  return new Promise(function(resolve, reject) {
    influencer.findOne({
      'profile.email': email,
    }, function(err, doc) {
      if (err) {
        reject("some Db Error Occur");
      } else {
        if (doc) {
          resolve(1);
        } else {
          emailVerify.findOne({
            'email': email,
            'active': 0
          }, function(err, doc) {
            if (err) {
              reject("some Db Error Occur");
            } else {
              if (doc) resolve(1);
              else resolve(0);
            }

          });
        }

      }
    });
  });

};

let check_user_mobileno = function(body) {

  mob = body.mob;
  return new Promise(function(resolve, reject) {
    influencer.findOne({
      'profile.mob': mob,
    }, function(err, doc) {
      if (err) {
        reject("some Db Error Occur");
      } else {
        if (doc)
          resolve(1);
        else
          {
            mobileotp.findOne({
              'mobileno': mob,
              'active': 0
            }, function(err, doc) {
              if (err) {
                reject("some Db Error Occur");
              } else {
                if (doc) resolve(1);
                else resolve(0);

              }

            });
          }
      }
    });
  });

};


let verify_OTP_mobileno = function(body) {
  return new Promise(function(resolve,reject){
  mobileotp.findOne({})
  });
};
module.exports = {
  storeInfluencerProfile: storeInfluencerProfile,
  send_mobile_otp: send_mobile_otp,
  checkusername: checkusername,
  save_user_data: save_user_data,
  check_user_email: check_user_email,
  check_user_mobileno: check_user_mobileno,
  send_email_verification: send_email_verification,
  storeBrandProfile:storeBrandProfile
}

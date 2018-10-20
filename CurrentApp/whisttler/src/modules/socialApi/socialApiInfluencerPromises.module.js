const express = require('express');
const mongoose = require('mongoose');
var influencer = require('../../models/influencer.models');
const request = require('request');

require('../../config/dbconnection');
var Promise = require('promise');

let saveAccessToken = function (body, user) {
  return new Promise(function (resolve, reject) {
    if (body.platform == "FB") {
      var social = {
        "sociallinks.fb": body.accessToken
      };
    } else if (body.platform == "Instagram") {

      var social = {
        "sociallinks.instagram": body.accessToken
      };
    } else if (body.platform == "twitter") {

      var social = {
        "sociallinks.twitter": body.accessToken
      };
    } else if (body.platform == "youtube") {

      var social = {
        "sociallinks.instagram": body.accessToken
      };
    }

    var query = {
      user_id: user._id
    };
    influencer.findOneAndUpdate(query, {
      $set: social
    }, function (err, doc) {

      if (err)
        reject();
      else {
        console.log(doc);
        resolve({
          message: "Token stored successfully"
        });
      }

    });

  });

}

let Fbdata = function (user) {
  return new Promise(function (resolve, reject) {
    influencer.findOne({
      user_id: user._id
    }, function (err, doc) {
      if (err) {
        reject({status: 0});
      } else {
        if (doc.sociallinks.fb != null) {
          var url = 'https://graph.facebook.com/me?fields=id,name,first_name,last_name,email,friends,hometown,posts.limit(20){description,created_time}&access_token=' + doc.sociallinks.fb;

          request(url, {
            json: true
          }, (err, resp, body) => {
            if (err) {
              reject({status: 0});
            } else {
              resolve({fbdata: resp.body});
            }
          });
        }
        else {
          reject({
            status: 1,
            meassage: "Facebook Account is not connected to whisttler "
          });
        }
      }
    });
  });
};

let instadata = function (user) {
  return new Promise(function (resolve, reject) {

    influencer.findOne({
      user_id: user._id
    }, function (err, doc) {
      if (err) {
        reject({
          status: 0
        });
      } else {
        if (doc.sociallinks.instagram != null) {
          var url = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + doc.sociallinks.instagram;
          request(url, {
            json: true
          }, (err, resp, body) => {
            if (err) {
              reject({
                status: 0
              });
            } else {
              var insta = resp.body;
              var url2 = 'https://api.instagram.com/v1/users/self/?access_token=' + doc.sociallinks.instagram;
              request(url2, {
                json: true
              }, (err, resp, body) => {
                if (err) {
                  reject({
                    status: 0
                  });
                } else {
                  var instaUserData = resp.body;
                  resolve({
                    post: insta,
                    userdata: instaUserData
                  });
                }
              });
            }

          });
        } else {
          reject({
            status: 1,
            meassage: "Instagram Account is not connected to whisttler "
          })
        }
      }
    });

  });
};

let briefSocialdata = function (user) {
  return new Promise(function (resolve, reject) {
    influencer.findOne({
      user_id: user._id
    }, function (err, doc) {
      if (err) reject();
      else {
        var socialdata = {}

        // if (doc.sociallinks.fb != null) {
        //   var url = 'https://graph.facebook.com/me?fields=id,name,first_name,last_name,email,friends,hometown,posts.limit(20){description,created_time}&access_token=' + doc.sociallinks.fb;
        //   //var url='https://graph.facebook.com/me?fields=id,name,first_name,last_name,email,friends,hometown,posts.limit(20){description,created_time}&access_token=EAADnzN7e2FABAAmYycRTKNtgpiEDj7fIU1o2gGRIis2bGlMdW66Y5HivSqphZAsMz9osBHzzftRiZCUIpMdDTlqlf6IvLrIk8ZCmEWnXQofhRikUTYvcXV7ZAwg6XbQf9fPTwbFqFrBdvvgpoO6do6Xg4tNv8ZAIFVz9HZAewZA5w5mzOJTW3JV5iALbFgGhLoZD';
        //
        //   //var url='https://graph.facebook.com/me?fields=id,name,email,friends,hometown,posts.limit(20){description,created_time}&access_token='+doc.sociallinks.fb;
        //
        //   request(url, {
        //     json: true
        //   }, (err, resp, body) => {
        //     if (err) {
        //       reject
        // ();
        //     } else {
        //
        //       socialdata.fb = resp.body;
        console.log(socialdata);
        if (doc.sociallinks.instagram != null) {
          var url = 'https://api.instagram.com/v1/users/self/?access_token=' + doc.sociallinks.instagram;
          //var url='https://api.instagram.com/v1/users/self/?access_token=6064976878.a0aed59.162b702c88dd44118b89e0fddd17be2c';

          console.log(url);
          request(url, {
            json: true
          }, (err, resp, body) => {
            if (err) {
              reject();
            } else {

              socialdata.instagram = resp.body;
              console.log(socialdata);
              resolve(socialdata);
            }

          });

        }
        //     }
        //
        //   });
        // }


      }
    });

  });
}


module.exports = {

  saveAccessToken: saveAccessToken,
  Fbdata: Fbdata,
  briefSocialdata: briefSocialdata,
  instadata: instadata

}

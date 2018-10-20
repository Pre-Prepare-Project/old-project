const express = require('express');
const mongoose = require('mongoose');
const User = require('../../models/users.model');
var influencer = require('../../models/influencer.models');
require('../../config/dbconnection');
var Promise = require('promise');
var consts = require('../../constants/statusMessage');
const profilePromise=require('./profilePromises');

var profileData = function(req, res) {
  var role = req.user.role;
  if (role == consts.influencer) {
    console.log(req.user);
    profilePromise.getInfluencerProfile(req.user)
      .then(function(result) {
        res.status(200).json(result);
      })
      .catch(function() {
        res.status(500).json(consts.ERROR_500);
      });
  } else if (role == 'Brand') {
    res.status(500);
  }
}

var changeUserPassword=function(req,res)
{
  profilePromise.changePassword(req.user,req.body)
  .then(function(result){
    res.status(200).json(result);
  })
  .catch(function(result){
      if(result.status==1)
      {
        res.status(400).json(result);
      }
      else{
        res.status(500).json(consts.ERROR_500);
      }
  });
};

var updateBankDetails=function(req,res){
  if(req.user.role==consts.influencer)
  {
    profilePromise.BankDetails(req.user,req.body)
    .then(function(result){
      res.status(200).json(result);
    })
    .catch(function(result){
      res.status(500).json(consts.ERROR_500);
    });
  }
  else{
    res.status(403).json(consts.ERROR_403);
  }
}

var updatePaidType=function(req,res){
  influencer.update({user_id:req.user._id},{paidType:req.body.paidType},function(err,doc){
    if(err) res.status(500).json(consts.ERROR_500);
    else{
      res.status(200).json({message:"Paid Type successfully Updated "});
    }
  });
}

var updatePostPrice=function(req,res){
profilePromise.updatepostsprice(req.user,req.body)
.then(function(result){
  res.status(200).json(result);
})
.catch(function(){
  res.status(500).json(consts.ERROR_500);
});
};

var updateProfileData=function(req,res){
  profilePromise.updateprofile(req.user,req.body)
  .then(function(result){
    res.status(200).json(result);
  }).catch(function(){
    res.status(500).json(consts.ERROR_500);
  });
};

var profileCompletnesspercent=function(req,res){

  profilePromise.profileCompletness(req.user)
  .then(function(result){
    res.json(result);
  })

};
module.exports = {
  profileData: profileData,
  changeUserPassword:changeUserPassword,
  updateBankDetails:updateBankDetails,
  updatePaidType:updatePaidType,
  updatePostPrice:updatePostPrice,
  updateProfileData:updateProfileData,
  profileCompletnesspercent:profileCompletnesspercent
};

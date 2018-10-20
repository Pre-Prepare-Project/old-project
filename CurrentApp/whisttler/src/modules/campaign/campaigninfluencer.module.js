const express = require('express');
const mongoose = require('mongoose');
var User = require('../../models/users.model');
var campaign = require('../../models/campaigns.model');
require('../../config/dbconnection');
var Promise = require('promise');

let getcampaigns=function()
{
  return new Promise(function(resolve,reject){
    campaign.find({
      "status":1
    }).select('CampaignName dates status shortDesc').exec(function(err,doc){
      if(err)
      reject();
      else{
        resolve(doc);
      }
    });
  });
}

let getcampaignDetails=function(body){
  return new Promise(function(resolve, reject) {
  campaign.find({
    "_id": body.campaignId
  }).select('-influencers -detailDesc').exec(function(err, doc) {
    if (err) {
      reject();
    } else {
      resolve(doc);
    }
  });
});
}

let requestForCampaign=function(body,user){

return new Promise(function(resolve,reject){
  var record={ influencers: { influencerId : user._id } };
  campaign.update(
      { _id: body.campaignId },
      { $push:  record },
      function(err,doc) {
        if(err) reject();
        else resolve({message:"request has been sent successfully"});
      }
  );
});

}

let checkRequestDuplicacy=function(body,user)
{
  return new Promise(function(resolve,reject){
  campaign.find({_id:body.campaignId,influencers:{$elemMatch:{influencerId:user._id}}}).select('').exec(function(err,doc){
    if(err)
    reject();

    resolve(doc);

  });
});
}

module.exports={
getcampaigns : getcampaigns,
getcampaignDetails:getcampaignDetails,
requestForCampaign:requestForCampaign,
checkRequestDuplicacy:checkRequestDuplicacy
}

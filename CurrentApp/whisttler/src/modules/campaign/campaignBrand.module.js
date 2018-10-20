const express = require('express');
const mongoose = require('mongoose');
var User = require('../../models/users.model');
var campaign = require('../../models/campaigns.model');
require('../../config/dbconnection');
var Promise = require('promise');

let createCampaign = function(body, user) {
  return new Promise(function(resolve, reject) {

    var record = new campaign();
      record.CampaignName = body.CampaignName,
      record.Brandcreated = user._id;
      record.dates.Startdate = body.Startdate,
      record.dates.duration = body.duration,
      record.objective = body.objective,
      record.shortDesc = body.shortDesc,
      record.detailDesc = body.detailDesc,
      record.platforms=body.platforms,
      record.influencerType=body.influencerType,
      record.targetCities= body.targetCities
      record.save(function(err, doc) {
      if (err) {
        reject();
      } else {
        resolve({meassage:"Campaign Created Successfully"});
      }

    });
  });
}

let getcampaignInfluencer = function(body) {
  console.log(body);
  return new Promise(function(resolve, reject) {
    campaign.find({
      "_id": body.campaignId
    }).select(
      'influencers'
    ).exec(function(err, doc) {
      console.log(doc);
      if (err) {
        reject();
      } else {
        resolve(doc);
      }
    });
  });
}


let getRunningCampaignList = function(user) {
  return new Promise(function(resolve, reject) {
    campaign.find({
      "Brandcreated": user._id,
      "status": 0
    }).select('CampaignName dates status shortDesc').exec(function(err, doc) {
      if (err) {
        reject();
      } else {
        resolve(doc);
      }
    });
  });
}

let getcampaignDetails=function(body) {
    return new Promise(function(resolve, reject) {
    campaign.find({
      "_id": body.campaignId
    }).select('-influencers').exec(function(err, doc) {
      if (err) {
        reject();
      } else {
        resolve(doc);
      }
    });
  });
}

module.exports=
{
  createCampaign:createCampaign,
  getRunningCampaignList:getRunningCampaignList,
  getcampaignDetails:getcampaignDetails,
  getcampaignInfluencer:getcampaignInfluencer
}

const express = require('express');
const mongoose = require('mongoose');
const campaignRouter = express.Router();
const inficampaignModule = require("./campaigninfluencer.module");
const brandcampaignModule = require("./campaignBrand.module");
var consts = require('../../constants/statusMessage');

var getBrandcampaigns = function(req, res) {
  if (req.user.role == consts.brand || req.user.role == consts.admin) {
    brandcampaignModule.getRunningCampaignList(req.user).then(function(result) {
      res.status(200).json(result);
    }).catch(function() {
      res.status(500).json(consts.ERROR_500);
    });
  } else if (req.user.role == 'influencer') {
    inficampaignModule.getcampaigns()
      .then(function(result) {
        res.status(200).json(result);
      })
      .catch(function() {
        return res.status(500).json(consts.ERROR_500);
      });
  } else {
    return res.status(403).json(consts.ERROR_403);
  }
}

var getcampaignDetail = function(req, res) {
  if (req.user.role == consts.brand || req.user.role == consts.admin) {
    brandcampaignModule.getcampaignDetails(req.params)
      .then(function(result) {
        res.status(200).json(result);
      })
      .catch(function() {
        res.status(500).json(consts.ERROR_500);
      });
  } else if (req.user.role == consts.influencer) {

    inficampaignModule.getcampaignDetails(req.params)
      .then(function(result) {
        res.status(200).json(result);
      })
      .catch(function() {
        res.status(500).json(consts.ERROR_500);
      });
  } else {
    res.status(403).json(consts.ERROR_403);
  }
}

var createCampaign = function(req, res) {
  if (req.user.role == consts.brand || req.user.role == consts.admin) {
    brandcampaignModule.createCampaign(req.body, req.user).then(function(result) {
      res.status(200).json(result);
    }).catch(function() {
      res.status(500).json(consts.ERROR_500);
    });
  } else {
    res.status(403).json(consts.ERROR_403);
  }
}

var requestCampaign = function(req, res) {
  if (req.user.role == consts.influencer || req.user.role == consts.admin) {
    inficampaignModule.checkRequestDuplicacy(req.params, req.user)
      .then(function(result) {
        res.status(200).json(result);
      })
      .catch(function() {
        res.status(500).json(consts.ERROR_500);
      });
  } else {
    res.status(403).json(consts.ERROR_403);
  }
}

var getcampaignInfluencer = function(req, res) {
  if (req.user.role == consts.brand || req.user.role == consts.admin) {
    brandcampaignModule.getcampaignInfluencer(req.params)
      .then(function(result) {
        res.status(200).json(result);
      })
      .catch(function() {
        res.status(500).json(consts.ERROR_500);
      });
  } else {
    res.status(403).json(consts.ERROR_403);
  }

}




module.exports = {
  requestCampaign: requestCampaign,
  getcampaignDetail: getcampaignDetail,
  getBrandcampaigns: getBrandcampaigns,
  getcampaignInfluencer: getcampaignInfluencer,
  createCampaign: createCampaign

};

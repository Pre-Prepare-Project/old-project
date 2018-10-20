const express = require('express');
const mongoose = require('mongoose');
const campaignRouter = express.Router();
const campaignModule = require("../modules/campaign/mainCampaign.module");
var consts = require('../constants/statusMessage');

campaignRouter.get('/getcampaigns',campaignModule.getBrandcampaigns);
campaignRouter.get('/:campaignId', campaignModule.getcampaignDetail);
campaignRouter.put('/:campaignId/apply',campaignModule.requestCampaign);
campaignRouter.post('/create',campaignModule.createCampaign);
campaignRouter.get('/campaigninfluencer/:campaignId',campaignModule.getcampaignInfluencer);
module.exports=campaignRouter;

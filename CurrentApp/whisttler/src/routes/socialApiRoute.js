const express = require('express');
const mongoose = require('mongoose');
const socialApiRouter = express.Router();
//const User = require('../models/users.model');
require('../config/dbconnection');
const socialapiModule = require("../modules/socialApi/socialApi.module");
var consts = require('../constants/statusMessage');

socialApiRouter.get('/',socialapiModule.briefSocailData);
socialApiRouter.post('/access_token/',socialapiModule.saveAccessToken);
socialApiRouter.get('/fbdata/',socialapiModule.fbdata);
socialApiRouter.get('/instadata/',socialapiModule.detailInstaData);

module.exports = socialApiRouter;

const express = require('express');
const mongoose = require('mongoose');
const profileRouter = express.Router();
//const User = require('../models/users.model');
require('../config/dbconnection');
const profileModule = require("../modules/profile/profile.module");
var consts = require('../constants/statusMessage');

profileRouter.get('/',profileModule.profileData);
profileRouter.put('/bankdetails',profileModule.updateBankDetails);
profileRouter.put('/changepassword',profileModule.changeUserPassword);
profileRouter.put('/changepaidtype',profileModule.updatePaidType);
profileRouter.put('/changeprice',profileModule.updatePostPrice);
profileRouter.put('/',profileModule.updateProfileData);
profileRouter.get('/completness',profileModule.profileCompletnesspercent);

module.exports = profileRouter;

/*

{{
"firstname":"plmqaz",
"lastname":"qazdas",
"gender":"F",
"address1":"abc7",
"address2":"abc8",
"city":"delhi6",
"district":"Delhi6",
"pinCode":"10010"

}
  {
  	"oldpassword":"plm",
  	"newPassword":"123",
  	"confirmNewPassword":"plm"
  }
{
"acHolderName":"niks",
"accountNo":"123456789",
"bankName":"SBI",
"ifscCode":"SBIN100501",
"bankBranch":"ABC",
"bankAddress":"25/basas"
}

{
	"paidType":"Barter/cash/Both"
}

{
"text":"12",
"image":"14",
"video":"13"
}
*/

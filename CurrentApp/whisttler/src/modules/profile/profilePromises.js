const express = require('express');
const mongoose = require('mongoose');
const User = require('../../models/users.model');
var influencer = require('../../models/influencer.models');
require('../../config/dbconnection');
var Promise = require('promise');

let updateprofile=function(user,body)
{
return new Promise(function(resolve, reject) {

if(user.role==consts.influencer)
{
  var data = {
"profile.firstname":body.firstname,
"profile.lastname":body.lastname,
"profile.gender":body.gender,
"profile.Address.add1":body.address1,
"profile.Address.add2":body.address2,
"profile.Address.city":body.city,
"profile.Address.district":body.district,
"profile.Address.pinCode":body.pinCode
};
  influencer.findOneAndUpdate({user_id:user._id},{$set:data},function(err,doc){
    if(err) reject();
    else resolve({message:"Profile successfully Updated"});
  });
}

});
};

let getInfluencerProfile = function(user) {

  return new Promise(function(resolve, reject) {

    influencer.find({
      user_id: user._id
    }, function(err, doc) {
      if (err) {
        reject();
      } else {
        User.findOne({_id:user._id},('username'),function(err,doc2){
          if(err) reject();
          else{
            data.username=doc2;
            console.log(data);
            resolve({data:doc,username:doc2});
          }
        });

      }
    });

  });
};

let changePassword=function(user,body)
{
    return new Promise(function(resolve, reject) {
      User.findOne({
        _id: user._id
      }, function(err, doc) {
        if(err) reject({status:0});
        else{
              var valid = doc.comparePassword(body.oldpassword, doc.password);
              if(valid)
              {
                if(body.newPassword == body.confirmNewPassword)
                {
                  var record = new User();
                  var newpass=record.hashPassword(body.newPassword);
                  User.update({_id:user._id},{$set:{password:newpass}},function(err, doc){
                      if(err) reject({status:0});
                      else{
                        resolve({message:"Password change successfully"});
                      }
                  });
                }
                else{
                  reject({status:1,message:"New passwords  Dosen't Match"});
                }
              }
              else{
                reject({status:1,message:"Incorrect Old Password"});
              }
        }
      });
    });
};

let BankDetails=function(user,body)
{
  return new Promise(function(resolve, reject) {
    var data=
    {
    "bankdetails.acHolderName":body.acHolderName,
    "bankdetails.accountNo":body.accountNo,
    "bankdetails.bankName":body.bankName,
    "bankdetails.ifscCode":body.ifscCode,
    "bankdetails.bankBranch":body.bankBranch,
    "bankdetails.bankAddress":body.bankAddress
  };
      influencer.findOneAndUpdate({user_id:user._id},{$set:data},function(err,doc){
        if(err) reject();
        else
        { console.log(doc);
          resolve({message:"Bank Details Updated Successfully"});}
      });
  });
};

let updatepostsprice=function(user,body)
{
  return new Promise(function(resolve, reject) {
    var data={
      "postprice.text":body.text,
      "postprice.image":body.image,
      "postprice.video":body.video
    };
    influencer.findOneAndUpdate({user_id:user._id},{$set:data},function(err,doc){
      if(err)
      reject();
      else{
        resolve({message:"Post price Updated successfully"});
      }
    });
  });
};

let profileCompletness=function(user){
    return new Promise(function(resolve, reject) {
      influencer.findOne({user_id:user._id},function(err,doc){
        if(err) reject();
        else{

          console.log(Object.keys(doc.profile).filter(x=>doc.profile[x]==null).length);
          resolve(doc);
        }
      });
    });

};

module.exports={
  profileCompletness:profileCompletness,
  updatepostsprice:updatepostsprice,
  BankDetails:BankDetails,
  changePassword:changePassword,
  getInfluencerProfile:getInfluencerProfile,
  updateprofile:updateprofile
}

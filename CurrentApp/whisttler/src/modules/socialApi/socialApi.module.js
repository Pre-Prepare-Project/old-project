const express = require('express');
const mongoose = require('mongoose');
var consts = require('../../constants/statusMessage');
var socialApiPromises = require("./socialApiInfluencerPromises.module")

var fbData = function(req, res) {
  if (req.user.role)
  {
    socialApiPromises.Fbdata(req.user).then(function(result){
          res.status(200).json(result);
    }).catch(function(){
      if(result.status==0)
      {
      res.status(500).json(consts.ERROR_500);
    }else{
  res.status(400).json(result);
    }
  });
  }
  else{
    return res.status(403).json(consts.ERROR_403);
  }
}

var briefSocailData = function(req, res) {
  if (req.user.role)
  {
    socialApiPromises.briefSocialdata(req.user).then(function(result){
          res.status(200).json(result);
    }).catch(function(){
        res.status(500).json(consts.ERROR_500);
    })
  }
  else{
    return res.status(403).json(consts.ERROR_403);
  }
}
var detailInstaData=function(req,res){
  if (req.user.role)
  {
  socialApiPromises.instadata(req.user).then(function(result){
  res.status(200).json(result);
  })
  .catch(function(result){
    if(result.status==0)
    {
    res.status(500).json(consts.ERROR_500);
  }else{
res.status(400).json(result);
  }
  });
  }
  else{
    return res.status(403).json(consts.ERROR_403);
  }
}
var saveAccessToken = function(req, res) {

  if (req.user.role == consts.influencer) {
    socialApiPromises.saveAccessToken(req.body, req.user).then(function(msg) {
      res.status(200).json(msg);
    }).catch(function() {
      res.status(500).json(consts.ERROR_500);
    });
  } else {
    return res.status(403).json(consts.ERROR_403);
  }
}


module.exports = {
  fbdata: fbData,
  saveAccessToken: saveAccessToken,
  briefSocailData:briefSocailData,
  detailInstaData:detailInstaData

}

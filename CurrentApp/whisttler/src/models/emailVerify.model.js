const mongoose=require('mongoose');
var Schema=mongoose.Schema;
var emailVerifySchema=new Schema({
  user_id:Schema.Types.ObjectId,
  email:{type:String,required:true},
  url:{type:String},
  active:{type:Number,default:0},
  througApi:{type:String,required:true},
  date:{type: Date, default: Date.now}
},{
  collection: 'email-verify'
});

module.exports = mongoose.model('emailverify', emailVerifySchema);

/*
{
  user_id:"5b6adc532393982b0d915ccf",
  email:"singhal.nikhil.30@gmail.com",
  url:"email verify URl",
  active:"0(when generated)/-1(when not verfied)/1(when verified)",
  througApi:"signUp",
  date:"2018-08-08T12:55:10.432Z"
}
*/

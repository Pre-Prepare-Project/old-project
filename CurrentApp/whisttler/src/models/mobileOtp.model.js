const mongoose=require('mongoose');
var Schema=mongoose.Schema;
var mobileOtpSchema=new Schema({
  user_id:Schema.Types.ObjectId,
  mobileno:{type:String,required:true},
  otp:{type:String},
  active:{type:Number,default:0},
  throughApi:{type:String,required:true},
  date:{type: Date, default: Date.now}

},{
  collection: 'mobile-otp'
});

module.exports = mongoose.model('mobileotp', mobileOtpSchema);
/*
{
  user_id:5b6adc532393982b0d915ccf",
  mobileno:"7878787877787",
  otp:"4478",
  active:"0(when generated)/-1(when expired)/1(when verified)/",
  througApi:{type:String,required:null}

}

*/

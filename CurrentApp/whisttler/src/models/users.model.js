const mongoose = require('mongoose');
const bcrypt = require("bcrypt-nodejs");
var Schema = mongoose.Schema;
var userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String
  },

  active:{
    type:Number,
    required:true,
    default:0
  },
  date:{type: Date, default: Date.now}
}, {
  collection: 'User-data'
});
userSchema.methods.hashPassword = function(password) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  return hash;
}

userSchema.methods.comparePassword = function(password, hash) {
  return bcrypt.compareSync(password, hash);
}

module.exports = mongoose.model('users', userSchema);

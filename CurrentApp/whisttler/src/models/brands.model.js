const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BrandsSchema = new Schema({
  user_id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  comapanyname: {
    type: String,
    required: true
  },
  profile: {
    mob: {
      type: String,
      default: null
    },
    email: {
      type: String,
      default: null
    },
    Address: {
      add1: {
        type: String,
        default: null
      },
      add2: {
        type: String,
        default: null
      },
      city: {
        type: String,
        default: null
      },
      distrct: {
        type: String,
        default: null
      },
      pinCode: {
        type: String,
        default: null
      }
    }

  },
  Domain: [String]

},{
  collection: 'Brand-data'
});

module.exports = mongoose.model('brandData', BrandsSchema);

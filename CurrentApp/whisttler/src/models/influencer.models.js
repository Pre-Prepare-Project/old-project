const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var influencerSchema = new Schema({
  user_id: Schema.Types.ObjectId,
  bankdetails: {
    acHolderName: {
      type: String,
      deafult: null
    },
    accountNo: {
      type: String,
      default: null
    },
    bankName: {
      type: String,
      default: null
    },
    ifscCode: {
      type: String,
      default: null
    },
    bankBranch: {
      type: String,
      default: null
    },
    bankAddress: {
      type: String,
      default: null
    }
  },
  profile: {
    firstname: {
      type: String
    },
    lastname: {
      type: String,
      default: null
    },
    mob: {
      type: String,
      default: null
    },
    email: {
      type: String,
      default: null
    },
    gender: {
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
      district: {
        type: String,
        default: null
      },
      pinCode: {
        type: String,
        default: null
      }
    }
  },
  sociallinks: {
    fb: {
      type: String,
      default: null
    },
    twitter: {
      type: String,
      default: null
    },
    youtube: {
      type: String,
      default: null
    },
    instagram: {
      type: String,
      default: null
    }
  },
  paidType: {
    type: String,
    default: null
  },
  postprice: {
    text: {
      type: String,
      default: null
    },
    image: {
      type: String,
      default: null
    },
    video: {
      type: String,
      default: null
    }
  }

}, {
  collection: 'influencer-data'
});

module.exports = mongoose.model('influencerData', influencerSchema);

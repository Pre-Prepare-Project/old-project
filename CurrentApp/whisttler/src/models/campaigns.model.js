const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CampaignSchema = new Schema({
  CampaignName: {
    type: String,
    required: true
  },
  Brandcreated: {
    type: Schema.Types.ObjectId,
    required: true
  },
  status: {
    type: Number,
    default: 0
  },
  dates: {
    createddate: {
      type: Date,
      default: Date.now
    },
    Startdate: {
      type: Date,
      required: true
    },
    //enddate:{type: Date, required: true},
    duration: {
      type: Number,
      required: true
    }
  },
  objective: [String],
  platforms: [String],
  influencerType: [String],
  targetCities: [String],
  shortDesc: {
    type: String,
    required: true
  },
  detailDesc: {
    type: String,
    required: true
  },
  influencers: [{
    influencerId: {
      type: Schema.Types.ObjectId
      //required: true
    },
    status: {
      type: Number,
      default: 0
    }
  }]

}, {
  collection: 'Campaign'
});
module.exports = mongoose.model('Campaign', CampaignSchema);

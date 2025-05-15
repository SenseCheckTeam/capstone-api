const mongoose = require('mongoose');
const { Schema } = mongoose;

const partnerGroupSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const PartnerGroup = mongoose.model('PartnerGroup', partnerGroupSchema);

module.exports = PartnerGroup;

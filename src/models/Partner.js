const mongoose = require('mongoose');
const { Schema } = mongoose;

const partnerSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  imageUrl: {
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

const Partner = mongoose.model('Partner', partnerSchema);

module.exports = Partner;

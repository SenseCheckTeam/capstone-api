const mongoose = require('mongoose');
const { Schema } = mongoose;

const diagnosaSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
  },
  diagnosis: {
    type: String,
    required: true,
  },
  saran: {
    type: String,
    required: true,
  },
  confidence: {
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

const Diagnosa = mongoose.model('Diagnosa', diagnosaSchema);

module.exports = Diagnosa;
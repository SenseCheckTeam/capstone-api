const mongoose = require('mongoose');
const { Schema } = mongoose;

const tentangAplikasiSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
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

const TentangAplikasi = mongoose.model('TentangAplikasi', tentangAplikasiSchema);

module.exports = TentangAplikasi;

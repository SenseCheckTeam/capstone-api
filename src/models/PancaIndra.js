const mongoose = require('mongoose');
const { Schema } = mongoose;

const pancaIndraSchema = new Schema({
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

const PancaIndra = mongoose.model('PancaIndra', pancaIndraSchema);

module.exports = PancaIndra;

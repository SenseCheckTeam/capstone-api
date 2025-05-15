const mongoose = require('mongoose');
const { Schema } = mongoose;

const sliderSchema = new Schema({
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

const Slider = mongoose.model('Slider', sliderSchema);

module.exports = Slider;

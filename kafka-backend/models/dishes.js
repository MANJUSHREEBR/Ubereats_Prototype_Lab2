const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const dishesSchema = new mongoose.Schema({
  restaurant: {
    type: ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  name: {
    type: String,
    trim: true,
    require: true,
    maxlength: 32,
  },
  mainingredient: {
    type: String,
    trim: true,
  },
  photo: {
    type: String,
  },
  description: {
    type: String,
    trim: true,
  },
  dishtype: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Dishes', dishesSchema);

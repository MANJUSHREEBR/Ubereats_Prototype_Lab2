const mongoose = require('mongoose');
const crypto = require('crypto');
const { v1: uuidv1 } = require('uuid');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: true,
    maxlength: 32,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  hashed_password: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: Number,
    trim: true,
  },
  photo: {
    type: String,
    trim: true,
  },
  about: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  deliverymode: {
    type: String,
    trim: true,
  },
  starttime: {
    type: String,
    trim: true,
  },
  endtime: {
    type: String,
    trim: true,
  },
  salt: String,
  role: {
    type: Number,
    default: 1,
  },
  history: {
    type: Array,
    default: [],
  },
}, { timestamps: true });

// virtual field
restaurantSchema.virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });
restaurantSchema.methods = {
  checkPassword(password) {
    return this.encryptPassword(password) === this.hashed_password;
  },
  encryptPassword(password) {
    if (!password) return '';
    try {
      return crypto.createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },
};
module.exports = mongoose.model('Restaurant', restaurantSchema);
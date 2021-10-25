const mongoose = require('mongoose');
const crypto = require('crypto');
const { v1: uuidv1 } = require('uuid');

const userSchema = new mongoose.Schema({
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
    trim: true,
  },
  dob: {
    type: String,
    trim: true,
  },
  nickname: {
    type: String,
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
  salt: String,
  role: {
    type: Number,
    default: 0,
  },
  history: {
    type: Array,
    default: [],
  },
}, { timestamps: true });

// virtual field
userSchema.virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });
userSchema.methods = {
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
module.exports = mongoose.model('User', userSchema);

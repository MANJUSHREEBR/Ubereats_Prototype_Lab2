/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-unresolved */
const User = require('../models/user');
const Restaurant = require('../models/restaurant');
const { errorHandler } = require('../Utils/dbErrorHandler');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { auth } = require('../utils/passport');

auth();

exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user,
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (error, customer) => {
    if (error || !customer) {
      return res.status(400).json({
        error: "User with email doesn't exist! Please signup",
      });
    }
    if (customer.checkPassword(password)) {
      console.log('inside signin2');
      const payload = { _id: customer._id, customer };
      const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: 1008000,
      });
      return res.json({ token: `Bearer ${token}`, customer });
    }

    return res.status(401).json({
      error: 'Invalid password',
    });
  });
};

exports.restSignup = (req, res) => {
  const restaurant = new Restaurant(req.body);
  restaurant.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user,
    });
  });
};
exports.restSignin = (req, res) => {
  const { email, password } = req.body;
  Restaurant.findOne({ email }, (error, customer) => {
    if (error || !customer) {
      return res.status(400).json({
        error: "User with email doesn't exist! Please signup",
      });
    }
    if (customer.checkPassword(password)) {
      const payload = { _id: customer._id, customer };
      const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: 1008000,
      });
      return res.json({ token: `Bearer ${token}`, customer });
    }

    return res.status(401).json({
      error: 'Invalid password',
    });
  });
};
exports.isAuth = (req, res, next) => {
  const customer = req.profile && req.user && req.profile.email === req.user.email;
  if (!customer) {
    return res.status(403).json({
      error: 'Access denied',
    });
  }
  next();
};

exports.isRestaurantAuth = (req, res, next) => {
  const customer = req.restaurant && req.user && req.restaurant.email === req.user.email;
  if (!customer) {
    return res.status(403).json({
      error: 'Access denied',
    });
  }
  next();
};
exports.isRestaurant = (req, res, next) => {
  if (req.user.role !== 1) {
    return res.status(403).json({
      error: 'Restaurant resource! Access denied',
    });
  }
  next();
};

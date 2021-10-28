/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-unresolved */
const User = require('../models/user');
const Restaurant = require('../models/restaurant');
const { errorHandler } = require('../Utils/dbErrorHandler');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { auth } = require('../utils/passport');
const kafka = require('../kafka/client');

auth();

exports.signup = (req, res) => {
//   const myData = { topic: 'user_signup', user: req.body };
  kafka.make_request('user_signup', req.body, (err, results) => {
    console.log('in result');
    console.log(results);
    if (err) {
      console.log('Inside err');
      res.status(500).send(err);
    } else {
      console.log('Inside else');
      res.status(200).json(results);
      res.end();
    }
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
  kafka.make_request('restaurant_signup', req.body, (err, results) => {
    console.log('in result');
    console.log(results);
    if (err) {
      console.log('Inside err');
      res.status(500).send(err);
    } else {
      console.log('Inside else');
      res.status(200).json(results);
      res.end();
    }
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

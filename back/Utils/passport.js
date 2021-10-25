/* eslint-disable max-len */
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Users = require('../models/user');

// Setup work and export for the JWT passport strategy
function auth() {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: process.env.SECRET,
  };
  passport.use(
    new JwtStrategy(opts, (jwt_payload, callback) => {
      const user_id = jwt_payload._id;
      console.log('Inside passportjwt:auth()');
      Users.findById(user_id, (err, results) => {
        if (err) {
          return callback(err, false);
        }
        if (results) {
          callback(null, results);
        } else {
          callback(null, false);
        }
      });
    }),
  );
}
function requireAuth(req, res, next) {
  // Get the token
  const token = req.header('token');
  // check if not token
  if (!token) {
    return res.status(401).json({
      Error: 'No Token is available',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    // req.customer = decoded.customer;
    next();
  } catch (err) {
    res.status(401).json({
      error: 'Unautherized',
    });
  }
}

function checkAuth(req, res, next) {
  // Get the token
  const token = req.header('token');
  // check if not token
  if (!token) {
    return res.status(401).json({
      Error: 'No Token is available',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const customer = decoded.customer && req.profile && req.profile.email === decoded.customer.email;
    if (!customer) {
      throw ({});
    }

    next();
  } catch (err) {
    res.status(401).json({
      error: 'Unautherized',
    });
  }
}

exports.auth = auth;
exports.requireAuth = requireAuth;
exports.checkAuth = checkAuth;

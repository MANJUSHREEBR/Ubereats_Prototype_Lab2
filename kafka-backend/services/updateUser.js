const User = require('../models/user');
const { errorHandler } = require('../Utils/dbErrorHandler');
const formidable = require('formidable');
const _ = require('lodash');
// const fs = require('fs');
// const { cloudinary } = require('../Utils/cloudinary');
// const CircularJSON = require('circular-json');


function handle_request(user, callback){
 
    console.log("Inside update User kafka backend");
    User.findOneAndUpdate({ _id: user._id }, user).exec((err, result) => {
        if (err) {
          callback(null, errorHandler(err));
        }
        User.findOne({ _id: user._id }).exec((err, customer) => {
            if (err) {
              callback(null, errorHandler(err));
            }
        callback(null, customer);
      });
    });
  
};

exports.handle_request = handle_request;
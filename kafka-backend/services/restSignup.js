const Restaurant = require('../models/restaurant');
const { errorHandler } = require('../Utils/dbErrorHandler');

function handle_request(msg, callback){
   
    console.log("Inside restaurant Signup kafka backend");
    const restaurant = new Restaurant(msg);
    restaurant.save((err, user) => {
      if (err) {
        callback(null, errorHandler(err));
      }
      callback(null, user);
    });
};

exports.handle_request = handle_request;
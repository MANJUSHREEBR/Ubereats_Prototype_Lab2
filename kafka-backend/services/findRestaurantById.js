const Restaurant = require('../models/restaurant');
const { errorHandler } = require('../Utils/dbErrorHandler');

function handle_request(id, callback){
   
  console.log("Inside Find Restaurant By Id kafka backend");
  Restaurant.findById(id).exec((err, restaurant) => {
    if (err || !restaurant) {
        callback(null, errorHandler(err));
    }
    callback(null, restaurant);
  });
};

exports.handle_request = handle_request;
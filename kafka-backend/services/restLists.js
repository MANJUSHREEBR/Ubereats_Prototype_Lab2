const Restaurant = require('../models/restaurant');
const { errorHandler } = require('../Utils/dbErrorHandler');

function handle_request(query, callback){
   
  console.log("Inside restaurant Lists kafka backend");
  const search = query.search ? (query.search) : 'Pickup';
  const location = query.location ? (query.location) : 'San Jose';
  const bothType = 'Delivery & Pickup';
  const limit = query.limit ? parseInt(query.limit) : 6;
  Restaurant.find({})
    .limit(limit)
    .exec((err, restaurants) => {
      if (err) {
        callback(null, errorHandler(err));
      }
      callback(null, restaurants);
    });
};

exports.handle_request = handle_request;
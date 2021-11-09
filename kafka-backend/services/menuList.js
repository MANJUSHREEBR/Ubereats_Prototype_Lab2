const Dishes = require('../models/dishes');
const { errorHandler } = require('../Utils/dbErrorHandler');

function handle_request(query, callback){
   
  console.log("Inside Menu Lists kafka backend");
    Dishes.find({ restaurant: query._id })
    .populate('restaurant')
    .exec((err, restaurants) => {
      if (err) {
        callback(null, errorHandler(err));
      }
      callback(null, restaurants);
    });
};

exports.handle_request = handle_request;
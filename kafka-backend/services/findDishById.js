const Dishes = require('../models/dishes');
const { errorHandler } = require('../Utils/dbErrorHandler');

function handle_request(id, callback){
   
  console.log("Inside Find Dish By Id kafka backend");
    Dishes.findById(id).exec((err, dish) => {
    if (err || !dish) {
        callback(null, errorHandler(err));
    }
    callback(null, dish);
  });
};

exports.handle_request = handle_request;
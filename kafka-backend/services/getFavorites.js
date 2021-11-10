const Users = require('../models/user');
const { errorHandler } = require('../Utils/dbErrorHandler');

function handle_request(id, callback){
   
  console.log("Inside Add favorite restaurant kafka backend");
   Users.findOne({ _id: id })
    .populate('favorites')
    .exec((err, data) => {
      if (err) {
        callback(null, errorHandler(err));
      }
      callback(null, data); 
    });
};

exports.handle_request = handle_request;
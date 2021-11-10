const Users = require('../models/user');
const { errorHandler } = require('../Utils/dbErrorHandler');

function handle_request(id, callback){
   
  console.log("Inside Find Customer By Id kafka backend");
  Users.findById(id).exec((err, user) => {
    if (err || !user) {
        callback(null, errorHandler(err));
    }
    callback(null, user);
  });
};

exports.handle_request = handle_request;
const User = require('../models/user');
const { errorHandler } = require('../Utils/dbErrorHandler');

function handle_request(msg, callback){
   
    console.log("Inside user Signup kafka backend");
    const user = new User(msg);
    user.save((err, user) => {
      if (err) {
        callback(null, errorHandler(err));
      }
      callback(null, user);
    });
};

exports.handle_request = handle_request;
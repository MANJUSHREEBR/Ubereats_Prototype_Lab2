const User = require('../models/user');
const { errorHandler } = require('../Utils/dbErrorHandler');

function handle_request(msg, callback){
   
    console.log("Inside user Signup kafka backend");
   

    // books.push(msg);
    // callback(null, books);
    // console.log("after callback");
    const user = new User(msg);
    user.save((err, user) => {
      if (err) {
        // return res.status(400).json({
        //   err: errorHandler(err),
        // });
        callback(null, errorHandler(err));
      }
    //   user.salt = undefined;
    //   user.hashed_password = undefined;
   // console.log(user);
      callback(null, user);
    });
};

exports.handle_request = handle_request;
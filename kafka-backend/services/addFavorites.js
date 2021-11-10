const Users = require('../models/user');
const { errorHandler } = require('../Utils/dbErrorHandler');

function handle_request(req, callback){
   
  console.log("Inside Add favorite restaurant kafka backend");
  Users.findOneAndUpdate({ _id: req.userid }, { $push: { favorites: req.restid } }, { new: true }, (error, data) => {
    if (error) {
    callback(null, errorHandler(err));
    }
    callback(null, data);  });
};

exports.handle_request = handle_request;
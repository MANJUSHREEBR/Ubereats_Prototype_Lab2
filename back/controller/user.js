const User = require('../models/user');

exports.customerById = (req, res, next, id) => {
 User.findById(id).exec((err, customer)=> {
    if(err || !customer){
        return res.status(400).json({
            error:'User not found'
        })
       
    }
    req.profile = customer;
    next();
 })

}
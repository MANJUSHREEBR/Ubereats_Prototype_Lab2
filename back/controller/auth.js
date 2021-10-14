const User = require('../models/user');
const { errorHandler } = require('../Utils/dbErrorHandler');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { auth } = require("../utils/passport");
auth();

exports.signup = (req, res) => {
    console.log(req.body);
    const user = new User(req.body);
    user.save((err, user) => {
        if(err) {
            return res.status(400).json({
                err: errorHandler(err)
            })
        }
        user.salt= undefined;
        user.hashed_password = undefined;
        res.json({
            user
        });
    })

}

exports.signin = (req, res) => {
    const { email, password } = req.body;
    User.findOne({email}, (error, customer) => {
        if (error || !customer) {
            return res.status(400).json({
                error: "User with email doesn't exist! Please signup"
            })
        }
        if(customer.checkPassword(password)){
       
            const payload = { _id: customer._id, username: customer.name};
            const token = jwt.sign(payload, process.env.SECRET, {
                expiresIn: 1008000
            });
            //res.status(200).end("JWT " + token);
            return res.json({token, customer})
        }
        else{
            return res.status(401).json({
                error: "Invalid password"
            })
        }
    });
}
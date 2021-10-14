"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
require('dotenv').config();
const Users = require('../models/user');

// Setup work and export for the JWT passport strategy
function auth() {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: process.env.SECRET
    };
    passport.use(
        new JwtStrategy(opts, (jwt_payload, callback) => {
            const user_id = jwt_payload._id;
            Users.findById(user_id, (err, results) => {
                if (err) {
                    return callback(err, false);
                }
                if (results) {
                    callback(null, results);
                }
                else {
                    callback(null, false);
                }
            });
        })
    )
}

exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });
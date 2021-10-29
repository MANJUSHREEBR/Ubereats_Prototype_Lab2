/* eslint-disable consistent-return */
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const User = require('../models/user');
const { cloudinary } = require('../Utils/cloudinary');

exports.customerById = (req, res, next, id) => {
  User.findById(id).exec((err, customer) => {
    if (err || !customer) {
      return res.status(400).json({
        error: 'User not found',
      });
    }
    req.profile = customer;
    next();
  });
};

exports.updateUser = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded',
      });
    }

    let { profile } = req;
    user = _.extend(profile, fields);
    // const item = {};
    if (files.photo) {
      const uploadedResponse = await cloudinary.uploader
        .upload(files.photo.path, {
          upload_preset: 'uberEats',
        });
      //   item.data = uploadedResponse.url;
      //   item.contentType = files.photo.type;
      user.photo = uploadedResponse.url;
    }
    user.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

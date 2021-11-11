/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable consistent-return */
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const User = require('../models/user');
const kafka = require('../kafka/client');
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
  // kafka.make_request('find_customerById', id, (err, customer) => {
  //   if (err) {
  //     console.log('Inside err');
  //     return res.status(400).send({
  //       error: 'Customer not found',
  //     });
  //   }
  //   req.profile = customer;
  //   next();
  // });
};

exports.addFavorites = (req, res) => {
  const userid = req.profile._id;
  const restid = req.restaurant._id;
  kafka.make_request('add_favorites', { userid, restid }, (err, customer) => {
    if (err) {
      console.log('Inside err');
      return res.status(400).send({
        error: 'Customer not found',
      });
    }
    res.json(customer.favorites);
  });
};

exports.getFavorites = (req, res) => {
  kafka.make_request('get_favorites', req.profile._id, (err, customer) => {
    if (err) {
      console.log('Inside err');
      return res.status(400).send({
        error: 'Customer not found',
      });
    }
    res.json(customer.favorites);
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

    const { profile } = req;
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

/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const { cloudinary } = require('../Utils/cloudinary');
const { errorHandler } = require('../Utils/dbErrorHandler');
const Dishes = require('../models/dishes');

exports.create = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded',
      });
    }

    const dishes = new Dishes(fields);
    if (files.photo) {
      const uploadedResponse = await cloudinary.uploader
        .upload(files.photo.path, {
          upload_preset: 'uberEats',
        });
      dishes.photo = uploadedResponse.url;
    }
    dishes.restaurant = req.restaurant._id;
    dishes.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

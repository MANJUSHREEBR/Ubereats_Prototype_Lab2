/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const mongoose = require('mongoose');
const { cloudinary } = require('../Utils/cloudinary');
const { errorHandler } = require('../Utils/dbErrorHandler');
const Dishes = require('../models/dishes');
const kafka = require('../kafka/client');

const { ObjectId } = mongoose.Schema;

exports.findDishById = (req, res, next, id) => {
  kafka.make_request('find_dishById', id, (err, dish) => {
    if (err) {
      console.log('Inside err');
      return res.status(400).send({
        error: 'Dishes not found',
      });
    }
    req.dish = dish;
    next();
  });
};

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

exports.read = (req, res) => res.json(req.dish);

exports.update = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded',
      });
    }

    let dishes = req.dish;
    dishes = _.extend(dishes, fields);
    // const item = {};
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
exports.listAll = async (req, res) => {
  kafka.make_request('list_menu', req.restaurant, (err, results) => {
    if (err) {
      console.log('Inside err');
      return res.status(400).send({
        error: 'Dishes not found',
      });
    }
    console.log('Inside else');
    res.send(results);
  });
};

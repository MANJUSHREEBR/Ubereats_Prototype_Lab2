/* eslint-disable consistent-return */
/* eslint-disable radix */
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const kafka = require('../kafka/client');
const Restaurant = require('../models/restaurant');
const { cloudinary } = require('../Utils/cloudinary');

exports.findRestaurantById = (req, res, next, id) => {
  Restaurant.findById(id).exec((err, restaurant) => {
    if (err || !restaurant) {
      return res.status(400).json({
        error: 'Restaurant not found',
      });
    }
    req.restaurant = restaurant;
    next();
  });
  // kafka.make_request('find_restaurantById', id, (err, restaurant) => {
  //   if (err) {
  //     console.log('Inside err');
  //     return res.status(400).send({
  //       error: 'Restaurant not found',
  //     });
  //   }
  //   req.restaurant = restaurant;
  //   next();
  // });
};

exports.listAll = (req, res) => {
  kafka.make_request('restaurant_lists', req.query, (err, results) => {
    console.log('in result');
    console.log(results);
    if (err) {
      console.log('Inside err');
      return res.status(400).send({
        error: 'Restaurants not found',
      });
    }
    console.log('Inside else');
    res.send(results);
  });
  // const search = req.query.search ? (req.query.search) : 'Pickup';
  // const location = req.query.location ? (req.query.location) : 'San Jose';
  // const bothType = 'Delivery & Pickup';
  // const limit = req.query.limit ? parseInt(req.query.limit) : 6;
  // Restaurant.find({ deliverymode: { $in: [search, bothType] } })
  //   .limit(limit)
  //   .exec((err, restaurants) => {
  //     if (err) {
  //       return res.status(400).json({
  //         error: 'Restaurants not found',
  //       });
  //     }
  //     res.send(restaurants);
  //   });
};

exports.updateRest = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded',
      });
    }

    let { restaurant } = req;
    restaurant = _.extend(restaurant, fields);
    // const item = {};
    if (files.photo) {
      const uploadedResponse = await cloudinary.uploader
        .upload(files.photo.path, {
          upload_preset: 'uberEats',
        });
        //   item.data = uploadedResponse.url;
        //   item.contentType = files.photo.type;
      restaurant.photo = uploadedResponse.url;
    }
    restaurant.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};
exports.readRest = (req, res) => res.json(req.restaurant);

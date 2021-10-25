const Restaurant = require('../models/restaurant');

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
};

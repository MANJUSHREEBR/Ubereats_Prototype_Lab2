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

exports.listAll = (req, res) => {
  const search = req.query.search ? (req.query.search) : 'Pickup';
  const location = req.query.location ? (req.query.location) : 'San Jose';
  const bothType = 'Delivery & Pickup';
  const limit = req.query.limit ? parseInt(req.query.limit) : 2;
  Restaurant.find({ location})
    .limit(limit)
    .exec((err, restaurants) => {
      if (err) {
        return res.status(400).json({
          error: 'Restaurants not found',
        });
      }
      res.send(restaurants);
    });
};

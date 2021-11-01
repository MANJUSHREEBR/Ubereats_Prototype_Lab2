/* eslint-disable no-underscore-dangle */
const Order = require('../models/orders');
// const { errorHandler } = require('../Utils/dbErrorHandler');

exports.createOrder = (req, res) => {
  const {
    orderItems,
    shippingAddress,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user,
    restaurant,
  } = req.body;
  const order = new Order({
    orderItems,
    shippingAddress,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user,
    restaurant,
  });
  order.save((err, result) => {
    if (err || !result) {
      return res.status(400).send({
        error: 'Restaurants not found',
      });
    }
    res.send(result);
  });
};
exports.getRestOrders = (req, res) => {
  Order.find({ restaurant: req.restaurant._id })
    .populate('user')
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: 'Dishes not found',
        });
      }
      res.send(orders);
    });
};
exports.getUserOrders = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate('restaurant')
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: 'Dishes not found',
        });
      }
      res.send(orders);
    });
};

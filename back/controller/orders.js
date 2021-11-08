/* eslint-disable radix */
/* eslint-disable max-len */
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
    instruction,
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
    instruction,
  });
  order.status = 'Order Received';
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
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const size = req.query.size ? parseInt(req.query.size) : 5;
  const limit = parseInt(size);
  const skip = (page - 1) * size;
  Order.find({ restaurant: req.restaurant._id }, {}, { limit, skip })
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
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const size = req.query.size ? parseInt(req.query.size) : 5;
  const limit = parseInt(size);
  const skip = (page - 1) * size;
  Order.find({ user: req.profile._id }, {}, { limit, skip })
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
exports.orderById = (req, res, next, id) => {
  Order.findById(id).exec((err, order) => {
    if (err || !order) {
      return res.status(400).json({
        error: 'Order not found',
      });
    }
    req.order = order;
    next();
  });
};
exports.read = (req, res) => res.json(req.order);

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate({ _id: req.order._id }, { status: req.body.status });
    if (!order) {
      return res.status(400).json({
        error,
      });
    }
    res.send(order);
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

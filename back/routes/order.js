const express = require('express');

const router = express.Router();
// const { isRestaurantAuth, isRestaurant } = require('../controller/auth');
// const { checkAuth } = require('../Utils/passport');
const {
  createOrder, getRestOrders, getUserOrders,
} = require('../controller/orders');
const { customerById } = require('../controller/user');
const { findRestaurantById } = require('../controller/restaurant');

router.param('restaurantId', findRestaurantById);
router.param('customerId', customerById);

router.post('/order/create', createOrder);
router.get('/restaurant/orders/:restaurantId', getRestOrders);
router.get('/orders/:customerId', getUserOrders);

module.exports = router;

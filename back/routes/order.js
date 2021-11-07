const express = require('express');

const router = express.Router();
// const { isRestaurantAuth, isRestaurant } = require('../controller/auth');
// const { checkAuth } = require('../Utils/passport');
const {
  createOrder, getRestOrders, getUserOrders, orderById, read, updateOrderStatus,
} = require('../controller/orders');
const { customerById } = require('../controller/user');
const { findRestaurantById } = require('../controller/restaurant');

router.param('restaurantId', findRestaurantById);
router.param('customerId', customerById);
router.param('orderId', orderById);

router.get('/order/:orderId', read);
router.post('/order/create', createOrder);
router.get('/restaurant/orders/:restaurantId', getRestOrders);
router.get('/orders/:customerId', getUserOrders);
router.put('/restaurant/orders/:orderId', updateOrderStatus);

module.exports = router;

const express = require('express');

const router = express.Router();
const { isAuth, isRestaurantAuth, isRestaurant } = require('../controller/auth');
const { checkAuth } = require('../Utils/passport');

const { customerById, updateUser, addFavorites, getFavorites } = require('../controller/user');
const {
  findRestaurantById,
} = require('../controller/restaurant');

router.param('restaurantId', findRestaurantById);
router.param('customerId', customerById);
router.put('/customer/:customerId', updateUser);
router.post('/customer/addfav/:customerId/:restaurantId', addFavorites);
router.get('/customer/favorites/:customerId', getFavorites);

module.exports = router;

const express = require('express');

const router = express.Router();
const { isRestaurantAuth, isRestaurant } = require('../controller/auth');
const { checkAuth } = require('../Utils/passport');
const {
  create, findDishById, read, update, listAll,
} = require('../controller/dishes');
const {
  findRestaurantById,
} = require('../controller/restaurant');

router.param('restaurantId', findRestaurantById);
router.param('dishId', findDishById);

router.post('/dishes/create/:restaurantId', checkAuth, isRestaurantAuth, isRestaurant, create);
router.get('/dishes/:dishId', read);
router.put('/dishes/:dishId/:restaurantId', checkAuth, isRestaurantAuth, isRestaurant, update);
router.get('/restaurant/dishes/:restaurantId', listAll);
module.exports = router;

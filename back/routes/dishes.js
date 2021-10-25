const express = require('express');

const router = express.Router();

const { create } = require('../controller/dishes');
const {
  findRestaurantById,
} = require('../controller/restaurant');

router.param('restaurantId', findRestaurantById);

router.post('/dishes/create/:restaurantId', create);

module.exports = router;

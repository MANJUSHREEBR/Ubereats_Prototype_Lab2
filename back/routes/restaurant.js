const express = require('express');

const {
  findRestaurantById,
} = require('../controller/restaurant');

const router = express.Router();

router.param('restaurantId', findRestaurantById);

module.exports = router;

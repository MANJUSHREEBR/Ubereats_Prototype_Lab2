const express = require('express');

const {
  findRestaurantById, listAll,
} = require('../controller/restaurant');

const router = express.Router();

router.param('restaurantId', findRestaurantById);
router.get('/restaurants', listAll);

module.exports = router;

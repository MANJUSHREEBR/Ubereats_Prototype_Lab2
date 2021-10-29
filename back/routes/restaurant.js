const express = require('express');

const {
  findRestaurantById, listAll, updateRest, readRest,
} = require('../controller/restaurant');

const router = express.Router();

router.param('restaurantId', findRestaurantById);
router.get('/restaurants', listAll);
router.put('/restaurant/:restaurantId', updateRest);
router.get('/restaurant/:restaurantId', readRest);

module.exports = router;

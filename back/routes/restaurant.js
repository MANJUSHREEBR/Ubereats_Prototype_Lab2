const express = require('express');

const {
  findRestaurantById,
} = require('../controller/restaurant');

const router = express.Router();

router.param('restaurantId', findRestaurantById);
// router.get('/restaurant/:restaurantId', readRestaurant);
// router.put('/restaurant/:restaurantId', requireSignin, isAuthRestaurant, isRestaurant, updateRestaurant);
// router.get('/restaurant', list);
// router.get('/restaurant/photo/:restaurantId', photo);

module.exports = router;

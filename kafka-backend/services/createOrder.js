const Order = require('../models/orders');
const { errorHandler } = require('../Utils/dbErrorHandler');

function handle_request(msg, callback){
   console.log(msg);
    console.log("Inside Create Order kafka backend");
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
      } = msg;
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
            callback(null, errorHandler(err));
        }
        callback(null, result);
      });
    // const order = new Restaurant(msg);
    // order.save((err, order) => {
    //   if (err) {
    //     callback(null, errorHandler(err));
    //   }
    //   callback(null, order);
    // });
};

exports.handle_request = handle_request;
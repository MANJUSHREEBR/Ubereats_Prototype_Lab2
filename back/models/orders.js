const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        photo: { type: String, required: true },
        price: { type: Number, required: true },
        dish: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Dishes',
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    taxPrice: {
      type: String,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: String,
      required: true,
      default: 0.0,
    },
    itemsPrice: {
      type: String,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: String,
      required: true,
      default: 0.0,
    },
    status: {
      type: String,
      required: true,
      default: 'Order Received',
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Order', orderSchema);

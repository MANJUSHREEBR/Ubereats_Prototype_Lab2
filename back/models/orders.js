const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const CartItemSchema = new mongoose.Schema(
  {
    dishes: { type: ObjectId, ref: 'Dishes' },
    name: String,
    price: Number,
    count: Number,
  },
  { timestamps: true },
);

const CartItem = mongoose.model('CartItem', CartItemSchema);

const OrderSchema = new mongoose.Schema(
  {
    products: [CartItemSchema],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    status: {
      type: String,
      default: 'order Received',
      enum: ['order Received', 'Preparing', 'Delivered', 'Cancelled'], // enum means string objects
    },
    updated: Date,
    user: { type: ObjectId, ref: 'User' },
    restaurant: { type: ObjectId, ref: 'Restaurant' },
  },
  { timestamps: true },
);

const Order = mongoose.model('Order', OrderSchema);

module.exports = { Order, CartItem };

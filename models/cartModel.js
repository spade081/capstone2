const mongoose = require("mongoose");
const { Schema } = mongoose;

let productInfoSchema = new Schema({
  productId: String,
  productPrice: Number,
  productName: String,
  productDescription: String,
  productQty: { type: Number, default: 1 },
  addedOn: {
    type: Date,
    default: new Date(),
  },
});

let cartSchema = new Schema({
  totalAmount: Number,
  userId: String,
  productInfo: [productInfoSchema],
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;

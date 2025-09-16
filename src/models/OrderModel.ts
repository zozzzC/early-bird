import mongoose, { Schema } from "mongoose";
const orderItemAddOnSchema = new Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
});

const orderItemSchema = new Schema({
  name: { type: String, required: true },
  category: String,
  basePrice: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  size: orderItemAddOnSchema,
  milk: orderItemAddOnSchema,
  extra: [orderItemAddOnSchema],
});

const orderSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  pickupDate: Date,
  createdDate: Date,
  itemsArray: [orderItemSchema],
  paid: { type: Boolean, default: false },
  paymentIntentId: { type: String, default: null },
});

export const OrderModel =
  mongoose.models.Order || mongoose.model("Order", orderSchema);

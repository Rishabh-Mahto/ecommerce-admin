const { Schema, model, models } = require("mongoose");
const { AddressSchema } = require("./User");

const OrderSchema = new Schema({
  userEmail: { type: String },
  status: { type: String },
  isRentOrder: { type: Boolean },
  isDelivery: { type: Boolean },
  deliveryAddress: AddressSchema,
  productId: { type: [String] },
  price: { type: Number },
});

export const Order = models?.Order || model("Order", OrderSchema);

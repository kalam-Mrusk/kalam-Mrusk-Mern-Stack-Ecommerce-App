import mongoose from "mongoose";

const ShippingAddressSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    pincode: {
      type: String,
      required: true,
    },
    district: {
      type: String,
    },
    state: { type: String, required: true },
    country: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const ShippingAddress = mongoose.model(
  "ShippingAddress",
  ShippingAddressSchema
);
export default ShippingAddress;

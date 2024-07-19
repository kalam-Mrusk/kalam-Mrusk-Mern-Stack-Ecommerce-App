import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    discription: {
      type: String,
    },
    category1: {
      type: String,
      required: true,
    },
    category2: {
      type: String,
    },
    size: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    discountedPrice: {
      type: String,
    },
    color: {
      type: String,
      required: true,
    },
    rating: {
      type: [String],
      default: [],
    },
    review: {
      type: [String],
      default: [],
    },
    quantity: {
      type: String,
      required: true,
    },
    deliveryCharge: {
      type: String,
      default: "0",
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;

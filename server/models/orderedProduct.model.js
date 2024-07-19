import mongoose from "mongoose";

const ProductOrderedSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
    },
    // deliveryAddress: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "ShippingAddress",
    // },
    deliveryAddress: {
      type: String,
      default: "",
    },
    quantity: {
      type: Number,
      default: 1,
    },
    deliveryCharge: {
      type: String,
      default: "",
    },
    paymentType: {
      type: String,
      required: true,
    },
    sellingPrice: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Confirmed",
    },
    orderedDate: {
      type: String,
    },
    deliveryDate: {
      type: String,
    },
    razorpayOrderId: {
      type: String,
      default: "",
    },
    razorpayPaymentId: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const ProductOrdered = mongoose.model("ProductOrdered", ProductOrderedSchema);

export default ProductOrdered;

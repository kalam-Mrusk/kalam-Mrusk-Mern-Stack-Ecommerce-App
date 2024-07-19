import { ApiError } from "../utilities/ApiError.utility.js";
import { ApiResponse } from "../utilities/ApiResponse.utility.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";

import PaymentDetails from "../models/paymentDetails.model.js";
import Razorpay from "razorpay";
import crypto from "crypto";
const createOrder = asyncHandler(async (req, res, next) => {
  const { amount } = req.body;
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID, // YOUR RAZORPAY KEY
    key_secret: process.env.RAZORPAY_SECRET, // YOUR RAZORPAY SECRET
  });
  const options = {
    amount: amount,
    currency: "INR",
    receipt: "receipt_order_74394",
  };
  const order = await instance.orders.create(options);

  if (!order) {
    throw new ApiError(500, "Some error occured");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "order created successfully.", order));
});

const orderSuccess = asyncHandler(async (req, res) => {
  const {
    orderCreationId,
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
  } = req.body;

  const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
  const digest = shasum.digest("hex");

  if (digest !== razorpaySignature)
    return res.status(400).json({ msg: "Transaction not legit!" });

  const newPayment = PaymentDetails({
    razorpayDetails: {
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
      signature: razorpaySignature,
    },
    success: true,
  });

  // await newPayment.save();

  res.status(200).json(
    new ApiResponse(200, "payment verify", {
      msg: "success",
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
    })
  );
});

export { createOrder, orderSuccess };

import ProductOrdered from "../models/orderedProduct.model.js";
import { ApiError } from "../utilities/ApiError.utility.js";
import { ApiResponse } from "../utilities/ApiResponse.utility.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";

const createOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const {
    quantity,
    paymentType,
    deliveryAddress,
    orderedDate,
    deliveryDate,
    sellingPrice,
    razorpayOrderId,
    razorpayPaymentId,
  } = req.body;
  const productId = req.params.pid;
  const sellerId = req.params.sid;
  // const addressId = req.params.aid;
  if (!quantity || !paymentType) {
    throw new ApiError(409, "please fill required details");
  }
  const orderDeatil = await ProductOrdered.create({
    productId,
    userId,
    sellerId,
    // deliveryAddress: addressId,
    deliveryAddress,
    quantity,
    paymentType,
    deliveryDate,
    orderedDate,
    sellingPrice,
    razorpayPaymentId,
    razorpayOrderId,
  });
  res
    .status(200)
    .json(new ApiResponse(200, "order placed sucessfully", orderDeatil));
});
const myOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    throw new ApiError(400, "user not found");
  }
  const order = await ProductOrdered.find({ userId: userId });
  res
    .status(200)
    .json(new ApiResponse(200, "yours All ordered items. ", order));
});
const sellerOrder = asyncHandler(async (req, res) => {
  const sellerId = req.seller._id;
  if (!sellerId) {
    throw new ApiError(400, "seller not found");
  }
  const order = await ProductOrdered.find({
    $and: [{ sellerId: sellerId }, { status: "Confirmed" }],
  });
  res.status(200).json(new ApiResponse(200, "yours All orders items. ", order));
});

const cancelOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.oid;
  const { status } = req.body;
  const cancelled = await ProductOrdered.updateOne(
    { _id: orderId },
    { $set: { status: status } }
  );
  res.status(200).json(new ApiResponse(200, "ordered cancelled.", cancelled));
});
export { createOrder, cancelOrder, myOrder, sellerOrder };

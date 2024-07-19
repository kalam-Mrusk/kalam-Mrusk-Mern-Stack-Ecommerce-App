import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { ApiError } from "../utilities/ApiError.utility.js";
import { ApiResponse } from "../utilities/ApiResponse.utility.js";
import Cart from "../models/cart.model.js";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";
const addToCart = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const productId = req.params.id;
  if (!userId) {
    throw new ApiError(400, "user not found please login.");
  }
  const userExists = await User.findById(userId);
  const productExists = await Product.findById(productId);
  const existItemInCart = await Cart.findOne({
    $and: [{ productId: productId }, { userId: userId }],
  });
  if (!userExists || !productExists) {
    throw new ApiError(400, "user or product Id Incorrect.");
  }
  if (existItemInCart) {
    throw new ApiError(409, "item already exists in cart.");
  }
  const addedItem = await Cart.create({
    productId: productId,
    userId: userId,
  });
  res.status(200).json(
    new ApiResponse(200, "item added in your cart successfully.", {
      ...addedItem,
      message: "item Added successfully.",
    })
  );
});

const getCartProduct = asyncHandler(async (req, res, next) => {
  const userId = req.user?._id;
  if (!userId) {
    throw new ApiError(400, "user not found");
  }
  const product = await Cart.find({ userId: userId });
  res.status(200).json(new ApiResponse(200, "cart products", product));
});
const deleteFromCart = asyncHandler(async (req, res) => {
  const cartProductId = req.params.id;
  if (!cartProductId) {
    throw new ApiError(400, "product not found");
  }
  const revmovedProduct = await Cart.findByIdAndDelete(cartProductId);
  res
    .status(200)
    .json(new ApiResponse(200, "removed from cart", revmovedProduct));
});

export { addToCart, getCartProduct, deleteFromCart };

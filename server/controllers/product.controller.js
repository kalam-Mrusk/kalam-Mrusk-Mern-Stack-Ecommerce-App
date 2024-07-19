import Product from "../models/product.model.js";
import { ApiError } from "../utilities/ApiError.utility.js";
import { ApiResponse } from "../utilities/ApiResponse.utility.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";

const addProduct = asyncHandler(async (req, res, next) => {
  const sellerId = req.seller._id;
  const {
    imageUrl,
    title,
    discription,
    category1,
    category2,
    size,
    price,
    discountedPrice,
    color,
    quantity,
    deliveryCharge,
  } = req.body;
  const incompleteDetails = [
    imageUrl,
    title,
    discription,
    category1,
    category2,
    size,
    price,
    discountedPrice,
    color,
    quantity,
  ].some((element) => {
    return element === null || element.trim() === "";
  });
  if (incompleteDetails) {
    throw new ApiError(409, "incomplete details");
  }
  const addedProduct = await Product.create({
    imageUrl,
    title,
    discription,
    category1,
    category2,
    size,
    price,
    discountedPrice,
    color,
    quantity,
    deliveryCharge,
    sellerId,
  });
  res
    .status(200)
    .json(new ApiResponse(200, "product added successfully.", addedProduct));
});

const sellerProducts = asyncHandler(async (req, res) => {
  const sellerId = req.seller._id;
  const data = await Product.find({ sellerId: sellerId });
  res.status(200).json(new ApiResponse(200, "seller the products.", data));
});
const allProducts = asyncHandler(async (req, res) => {
  const data = await Product.find({});
  res.status(200).json(new ApiResponse(200, "All the products.", data));
});
const singleProduct = asyncHandler(async (req, res) => {
  const productId = req.params.pid;
  if (!productId) {
    throw new ApiError(409, "product id not found");
  }
  const data = await Product.findOne({ _id: productId });
  res.status(200).json(new ApiResponse(200, "single product.", data));
});
const updateProduct = asyncHandler(async (req, res, next) => {
  const productId = req.params.pid;
  const {
    imageUrl,
    title,
    discription,
    category1,
    category2,
    size,
    price,
    discountedPrice,
    color,
    quantity,
  } = req.body;
  const incompleteDetails = [
    imageUrl,
    title,
    discription,
    category1,
    category2,
    size,
    price,
    discountedPrice,
    color,
    quantity,
  ].some((element) => {
    return element === null || element.trim() === "";
  });
  if (incompleteDetails) {
    throw new ApiError(409, "incomplete details");
  }
  if (!productId) {
    throw new ApiError(400, " product id not found");
  }
  const findProduct = await Product.findOne({ _id: productId });
  if (!findProduct) {
    throw new ApiError(400, " product not found");
  }
  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    {
      imageUrl,
      title,
      discription,
      category1,
      category2,
      size,
      price,
      discountedPrice,
      color,
      quantity,
    },
    { new: true }
  );
  res
    .status(200)
    .json(
      new ApiResponse(200, "product updated successfully.", updatedProduct)
    );
});

const deleteProduct = asyncHandler(async (req, res, next) => {
  const productId = req.params.pid;
  if (!productId) {
    throw new ApiError(400, "Unauthorized deletion");
  }
  const deletedProduct = await Product.findByIdAndDelete(productId);
  res
    .status(200)
    .json(new ApiResponse(200, "product deleted successfully", deletedProduct));
});

const searchProduct = asyncHandler(async (req, res) => {
  const query = req.query.q;

  const products = await Product.find({
    $or: [
      { title: new RegExp(query, "i") },
      { category1: new RegExp(query, "i") },
      { category2: new RegExp(query, "i") },
    ],
  });
  res.status(200).json(new ApiResponse(200, "all searched product.", products));
});

export {
  addProduct,
  allProducts,
  updateProduct,
  deleteProduct,
  singleProduct,
  searchProduct,
  sellerProducts,
};

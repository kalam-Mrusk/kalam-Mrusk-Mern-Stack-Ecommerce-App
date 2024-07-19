import ShippingAddress from "../models/shippingAddress.model.js";
import { ApiError } from "../utilities/ApiError.utility.js";
import { ApiResponse } from "../utilities/ApiResponse.utility.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";

const createShippingAddress = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { fullname, phone, address, pincode, district, state, country } =
    req.body;
  const incompleteDetails = [
    fullname,
    phone,
    address,
    pincode,
    district,
    state,
    country,
  ].some((ele) => {
    return ele === null || ele.trim() === "";
  });
  if (incompleteDetails) {
    throw new ApiError(409, "please fill the required fields.");
  }
  const addressExists = await ShippingAddress.findOne({ userId: userId });
  if (addressExists) {
    throw new ApiError(400, "address already exists.");
  }
  const createdAddress = await ShippingAddress.create({
    fullname,
    phone,
    address,
    pincode,
    district,
    state,
    country,
    userId: userId,
  });
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "shipping address created sucessfully.",
        createdAddress
      )
    );
});

const getShippingAddress = asyncHandler(async (req, res) => {
  const userid = req.user._id;
  if (!userid) {
    throw new ApiError(400, "user not found");
  }
  const Address = await ShippingAddress.findOne({ userId: userid });
  res.status(200).json(new ApiResponse(200, "Shipping Address.", Address));
});

const updateShippingAddress = asyncHandler(async (req, res, next) => {
  const addressId = req.params.id;
  const { fullname, phone, address, pincode, district, state, country } =
    req.body;
  const incompleteDetails = [
    fullname,
    phone,
    address,
    pincode,
    district,
    state,
    country,
  ].some((ele) => {
    return ele === null || ele.trim() === "";
  });
  if (incompleteDetails) {
    throw new ApiError(409, "please fill the required fields.");
  }
  const updatedAddress = await ShippingAddress.findByIdAndUpdate(
    addressId,
    {
      fullname,
      phone,
      address,
      pincode,
      district,
      state,
      country,
    },
    { new: true }
  );
  res
    .status(200)
    .json(
      new ApiResponse(200, "your detail updated successfully.", updatedAddress)
    );
});

const deleteShippingAddress = asyncHandler(async (req, res) => {
  const addressId = req.params.id;
  if (!addressId) {
    throw new ApiError(400, "address not found");
  }
  const deletedAddress = await ShippingAddress.findByIdAndDelete(addressId);
  res
    .status(200)
    .json(new ApiResponse(200, "address deleted successfully", deletedAddress));
});
export {
  createShippingAddress,
  getShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
};

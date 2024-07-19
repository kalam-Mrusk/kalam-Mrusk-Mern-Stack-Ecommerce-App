import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { ApiError } from "../utilities/ApiError.utility.js";
import { ApiResponse } from "../utilities/ApiResponse.utility.js";
import UserDetail from "../models/userDetails.model.js";

const createUserDetails = asyncHandler(async (req, res, next) => {
  const { fullname, gender, address, pincode, district, state, country } =
    req.body;
  const id = req.user._id;
  const incompleteDetails = [fullname, gender, country].some((ele) => {
    return ele === null || ele.trim() === "";
  });
  if (incompleteDetails) {
    throw new ApiError(409, "please fill the required fields.");
  }
  const detailsExists = await UserDetail.findOne({ userId: id });
  if (detailsExists) {
    throw new ApiError(409, "your details already exists.");
  }
  const createdDetails = await UserDetail.create({
    fullname,
    gender,
    address,
    pincode,
    district,
    state,
    country,
    userId: id,
  });
  res
    .status(200)
    .json(
      new ApiResponse(200, "details are created successfully.", createdDetails)
    );
});

const updateUserDetails = asyncHandler(async (req, res, next) => {
  const { fullname, gender, address, pincode, district, state, country } =
    req.body;
  const id = req.user._id;
  const incompleteDetails = [fullname, gender, country].some((ele) => {
    return ele === null || ele.trim() === "";
  });
  if (incompleteDetails) {
    throw new ApiError(409, "please fill the required fields.");
  }
  const detailsExists = await UserDetail.findOne({ userId: id });
  const updatedDetails = await UserDetail.findByIdAndUpdate(
    detailsExists._id,
    {
      fullname,
      gender,
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
      new ApiResponse(200, "your detail updated successfully.", updatedDetails)
    );
});

export { createUserDetails, updateUserDetails };

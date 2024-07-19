import Admin from "../models/admin.model.js";
import Seller from "../models/seller.model.js";
import User from "../models/user.model.js";
import { ApiError } from "../utilities/ApiError.utility.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import jwt from "jsonwebtoken";
const verifyUser = asyncHandler(async (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) {
      throw new ApiError(400, "Unauthorized Access.");
    }
    const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
    const user = await User.findById(decode._id).select("-password");

    if (!user) {
      throw new ApiError(400, "Invalid access token.");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(400, error.message || "Something went wrong");
  }
});
const verifySeller = asyncHandler(async (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) {
      throw new ApiError(400, "Unauthorized Access.");
    }
    const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
    const seller = await Seller.findById(decode._id).select("-password");

    if (!seller) {
      throw new ApiError(400, "Invalid access token.");
    }
    req.seller = seller;
    next();
  } catch (error) {
    throw new ApiError(400, error.message || "Something went wrong");
  }
});
const verifyAdmin = asyncHandler(async (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) {
      throw new ApiError(400, "Unauthorized Access.");
    }
    const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
    const admin = await Admin.findById(decode._id).select("-password");

    if (!admin) {
      throw new ApiError(400, "Invalid access token.");
    }
    req.admin = admin;
    next();
  } catch (error) {
    throw new ApiError(400, error.message || "Something went wrong");
  }
});

export { verifyUser, verifyAdmin, verifySeller };

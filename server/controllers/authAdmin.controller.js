import { ApiError } from "../utilities/ApiError.utility.js";
import { ApiResponse } from "../utilities/ApiResponse.utility.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import Admin from "../models/admin.model.js";

const adminRegistration = asyncHandler(async (req, res, next) => {
  const { username, gmail, password } = req.body;
  const inCompleteDetail = [username, gmail, password].some((element) => {
    return element === null || element.trim() === "";
  });
  if (inCompleteDetail) {
    throw new ApiError(400, "incomplete Details.");
  }
  const userExist = await Admin.findOne({ $or: [{ gmail }, { username }] });
  if (userExist) {
    throw new ApiError(409, "gmail or username  already exist.");
  }
  const newAdmin = await Admin.create({
    username: username,
    gmail: gmail,
    password: password,
  });
  const { ...data } = newAdmin._doc;
  delete data.password;
  res
    .status(200)
    .json(new ApiResponse(200, "Admin Created successfully.", data));
});

const adminLogin = asyncHandler(async (req, res, next) => {
  const { usernameOrGmail, password } = req.body;
  const inCompleteDetail = [usernameOrGmail, password].some((element) => {
    return element === null || element.trim() === "";
  });
  if (inCompleteDetail) {
    throw new ApiError(409, "incomplete details");
  }
  const admin = await Admin.findOne({
    $or: [{ gmail: usernameOrGmail }, { username: usernameOrGmail }],
  });
  if (!admin) {
    throw new ApiError(409, "admin does not exists");
  }
  const isPasswordCorrect = await admin.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(409, "Wrong password.");
  }
  const accessToken = admin.generateAccessToken();
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 5 * 24 * 60 * 60 * 1000,
    //         1day   1hour  1min    1sec
  };
  const { ...adminData } = admin._doc;
  delete adminData.password;
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(200, "admin Login successfully.", {
        accessToken,
        admin: adminData,
      })
    );
});

const adminLoggedOut = asyncHandler(async (req, res, next) => {
  const admin = req.admin;
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };
  res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, "admin logged out successfully.", admin));
});

export { adminRegistration, adminLogin, adminLoggedOut };

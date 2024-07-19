import User from "../models/user.model.js";
import { ApiError } from "../utilities/ApiError.utility.js";
import { ApiResponse } from "../utilities/ApiResponse.utility.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(400, "Unauthorized access");
  }

  const accessToken = user.generateAccessToken();

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 5 * 24 * 60 * 60 * 1000,
    //         1day   1hour  1min    1sec
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(200, "Current user verified", { user }));
});

const userRegistration = asyncHandler(async (req, res, next) => {
  const { gmail, phone, password } = req.body;
  const inCompleteDetail = [gmail, phone, password].some((element) => {
    return element === null || element.trim() === "";
  });
  if (inCompleteDetail) {
    throw new ApiError(400, "incomplete Details.");
  }
  const userExist = await User.findOne({ $or: [{ gmail }, { phone }] });
  if (userExist) {
    throw new ApiError(409, "gmail or phone no already exist.");
  }
  const newUser = await User.create({
    gmail: gmail,
    phone: phone,
    password: password,
  });
  const { ...data } = newUser._doc;
  delete data.password;
  res
    .status(200)
    .json(new ApiResponse(200, "user Created successfully.", data));
});

const userLogin = asyncHandler(async (req, res, next) => {
  const { gmailOrPhone, password } = req.body;
  const inCompleteDetail = [gmailOrPhone, password].some((element) => {
    return element === null || element.trim() === "";
  });
  if (inCompleteDetail) {
    throw new ApiError(409, "incomplete details");
  }
  const user = await User.findOne({
    $or: [{ gmail: gmailOrPhone }, { phone: gmailOrPhone }],
  });
  if (!user) {
    throw new ApiError(409, "user does not exists");
  }
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(409, "Wrong password.");
  }
  const accessToken = user.generateAccessToken();
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 5 * 24 * 60 * 60 * 1000,
    //         1day   1hour  1min    1sec
  };
  const { ...userData } = user._doc;
  delete userData.password;
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(200, "user Login successfully.", {
        accessToken,
        user: userData,
      })
    );
});

const userLoggedOut = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };
  res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, "user logged out successfully.", user));
});

export { userRegistration, userLogin, userLoggedOut, getCurrentUser };

import { ApiError } from "../utilities/ApiError.utility.js";
import { ApiResponse } from "../utilities/ApiResponse.utility.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import Seller from "../models/seller.model.js";

const sellerRegistration = asyncHandler(async (req, res, next) => {
  const { sellername, gmail, password } = req.body;
  const inCompleteDetail = [sellername, gmail, password].some((element) => {
    return element === null || element.trim() === "";
  });
  if (inCompleteDetail) {
    throw new ApiError(400, "incomplete Details.");
  }
  const sellerExist = await Seller.findOne({ gmail: gmail });
  if (sellerExist) {
    throw new ApiError(409, "gmail  already exist.");
  }
  //genrating sellerLoginId.........
  const capitalAlpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const smallAlpha = "abcdefghijklmnopqrstuvwxyz";
  const index1 = Math.floor(Math.random() * capitalAlpha.length);
  const index2 = Math.floor(Math.random() * capitalAlpha.length);
  const index3 = Math.floor(Math.random() * capitalAlpha.length);
  const index4 = Math.floor(Math.random() * smallAlpha.length);
  const index5 = Math.floor(Math.random() * smallAlpha.length);
  const randomNum = Math.floor(Math.random() * 10000000);
  const sellerLoginId = `${capitalAlpha[index1]}${capitalAlpha[index2]}${capitalAlpha[index3]}${randomNum}${smallAlpha[index4]}${smallAlpha[index5]}`;

  const newSeller = await Seller.create({
    sellername: sellername,
    gmail: gmail,
    sellerLoginId: sellerLoginId,
    password: password,
  });
  const { ...data } = newSeller._doc;
  delete data.password;
  res
    .status(200)
    .json(new ApiResponse(200, "seller Created successfully.", data));
});

const sellerLogin = asyncHandler(async (req, res, next) => {
  const { sellerLoginIdOrGmail, password } = req.body;
  const inCompleteDetail = [sellerLoginIdOrGmail, password].some((element) => {
    return element === null || element.trim() === "";
  });
  if (inCompleteDetail) {
    throw new ApiError(409, "incomplete details");
  }
  const seller = await Seller.findOne({
    $or: [
      { gmail: sellerLoginIdOrGmail },
      { sellerLoginId: sellerLoginIdOrGmail },
    ],
  });
  if (!seller) {
    throw new ApiError(409, "seller does not exists");
  }
  const isPasswordCorrect = await seller.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(409, "Wrong password.");
  }
  const accessToken = seller.generateAccessToken();
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 5 * 24 * 60 * 60 * 1000,
    //         1day   1hour  1min    1sec
  };
  const { ...sellerData } = seller._doc;
  delete sellerData.password;
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(200, "seller Login successfully.", {
        accessToken,
        seller: sellerData,
      })
    );
});
const getCurrentSeller = asyncHandler(async (req, res) => {
  const seller = req.seller;

  if (!seller) {
    throw new ApiError(400, "Unauthorized access");
  }

  const accessToken = seller.generateAccessToken();

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
    .json(new ApiResponse(200, "Current seller verified", { seller }));
});

const sellerLoggedOut = asyncHandler(async (req, res, next) => {
  const seller = req.seller;
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };
  res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, "seller logged out successfully.", seller));
});

export { sellerRegistration, sellerLogin, sellerLoggedOut, getCurrentSeller };

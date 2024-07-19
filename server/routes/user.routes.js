import { Router } from "express";
import {
  getCurrentUser,
  userLoggedOut,
  userLogin,
  userRegistration,
} from "../controllers/authUser.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";
import {
  createUserDetails,
  updateUserDetails,
} from "../controllers/userDetails.controller.js";

const userRouter = Router();

//Authentication routes
userRouter.post("/auth/register", userRegistration);
userRouter.post("/auth/login", userLogin);
userRouter.get("/current-user", verifyUser, getCurrentUser);
userRouter.get("/auth/logout", verifyUser, userLoggedOut);
userRouter.post("/details/create", verifyUser, createUserDetails);
userRouter.put("/details/update", verifyUser, updateUserDetails);
export default userRouter;

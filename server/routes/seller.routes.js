import { Router } from "express";
import { verifySeller } from "../middlewares/auth.middleware.js";
import {
  getCurrentSeller,
  sellerLoggedOut,
  sellerLogin,
  sellerRegistration,
} from "../controllers/authSeller.controller.js";

const sellerRouter = Router();

sellerRouter.post("/auth/register", sellerRegistration);
sellerRouter.post("/auth/login", sellerLogin);
sellerRouter.get("/auth/logout", verifySeller, sellerLoggedOut);
sellerRouter.get("/current-seller", verifySeller, getCurrentSeller);

export default sellerRouter;

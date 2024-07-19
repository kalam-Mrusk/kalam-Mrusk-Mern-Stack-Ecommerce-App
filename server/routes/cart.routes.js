import { Router } from "express";
import {
  addToCart,
  deleteFromCart,
  getCartProduct,
} from "../controllers/cart.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const cartRouter = Router();

cartRouter.post("/add-to-cart/:userId/:id", addToCart);
cartRouter.get("/get", verifyUser, getCartProduct);
cartRouter.delete("/remove/:id", verifyUser, deleteFromCart);
export default cartRouter;

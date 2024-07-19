import { Router } from "express";
import { verifyUser } from "../middlewares/auth.middleware.js";
import {
  createShippingAddress,
  deleteShippingAddress,
  getShippingAddress,
  updateShippingAddress,
} from "../controllers/shippingAddress.controller.js";
const ShippingAddressRouter = Router();

ShippingAddressRouter.post("/create", verifyUser, createShippingAddress);
ShippingAddressRouter.get("/get-address", verifyUser, getShippingAddress);
ShippingAddressRouter.put("/update/:id", updateShippingAddress);
ShippingAddressRouter.delete("/delete/:id", deleteShippingAddress);
export default ShippingAddressRouter;

import { Router } from "express";
import {
  cancelOrder,
  createOrder,
  myOrder,
  sellerOrder,
} from "../controllers/orderedProduct.controller.js";
import { verifySeller, verifyUser } from "../middlewares/auth.middleware.js";

const orderedProductRouter = Router();

orderedProductRouter.post("/order-placed/:sid/:pid", verifyUser, createOrder);
orderedProductRouter.put("/cancel/:oid", cancelOrder);
orderedProductRouter.get("/myorder", verifyUser, myOrder);
orderedProductRouter.get("/seller-order", verifySeller, sellerOrder);
export default orderedProductRouter;

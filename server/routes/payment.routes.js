import { Router } from "express";
import {
  createOrder,
  orderSuccess,
} from "../controllers/payment.controller.js";

const paymentRouter = Router();

paymentRouter.post("/orders", createOrder);
paymentRouter.post("/success", orderSuccess);

export default paymentRouter;

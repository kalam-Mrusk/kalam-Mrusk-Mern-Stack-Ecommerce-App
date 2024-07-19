import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import cookieParser from "cookie-parser";
import adminRouter from "./routes/admin.routes.js";
import cartRouter from "./routes/cart.routes.js";
import ShippingAddressRouter from "./routes/shippingAddress.routes.js";
import orderedProductRouter from "./routes/orderProduct.routes.js";
import paymentRouter from "./routes/payment.routes.js";
import sellerRouter from "./routes/seller.routes.js";

dotenv.config({ path: "./.env" });
const app = express();
app.use(
  cors({
    origin: [
      //   `${process.env.CLIENT_DOMAIN}`,
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:4173",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/ecommerce/user", userRouter);
app.use("/api/ecommerce/admin", adminRouter);
app.use("/api/ecommerce/seller", sellerRouter);
app.use("/api/ecommerce/product", productRouter);
app.use("/api/ecommerce/cart", cartRouter);
app.use("/api/ecommerce/shipping-address", ShippingAddressRouter);
app.use("/api/ecommerce/product/order", orderedProductRouter);
app.use("/api/ecommerce/payment", paymentRouter);
export default app;

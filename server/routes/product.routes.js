import { Router } from "express";
import {
  addProduct,
  allProducts,
  deleteProduct,
  searchProduct,
  sellerProducts,
  singleProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import { verifyAdmin, verifySeller } from "../middlewares/auth.middleware.js";

const productRouter = Router();
productRouter.post("/add-product", verifySeller, addProduct);
productRouter.get("/seller-product", verifySeller, sellerProducts);
productRouter.get("/all-product", allProducts);
productRouter.get("/search", searchProduct);
productRouter.get("/single-product/:pid", singleProduct);
productRouter.put("/update/:pid", updateProduct);
productRouter.delete("/delete/:pid", deleteProduct);
export default productRouter;

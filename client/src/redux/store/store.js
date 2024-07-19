import { configureStore } from "@reduxjs/toolkit";
import productReducers from "../slice/productSlice.js";
import userReducers from "../slice/userSlice.js";
import loadingReducers from "../slice/loadingSlice.js";
import cartReducers from "../slice/cartSlice.js";
import ShippingAddressReducers from "../slice/shippingAddressSlice.js";
import buyingProductDeatilReducer from "../slice/buyingProductDetailSlice.js";

const store = configureStore({
  reducer: {
    product: productReducers,
    user: userReducers,
    loading: loadingReducers,
    cart: cartReducers,
    shippingAddress: ShippingAddressReducers,
    productDetail: buyingProductDeatilReducer,
  },
});

export default store;

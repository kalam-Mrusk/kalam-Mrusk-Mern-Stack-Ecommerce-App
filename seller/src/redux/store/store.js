import { configureStore } from "@reduxjs/toolkit";
import sellerReducers from "../slice/sellerSlice.js";
import loadingReducers from "../slice/loadingSlice.js";

const store = configureStore({
  reducer: {
    seller: sellerReducers,
    loading: loadingReducers,
  },
});

export default store;

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  addedValue: null,
  value: true,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: async (state, action) => {
      const productId = action.payload;
      try {
        const res = await axios.post(
          `http://localhost:8080/api/ecommerce/cart/add-to-cart/${productId}`,
          { withCredentials: true }
        );
        state.addedValue = res.data?.data;
      } catch (error) {
        console.log(error);
        state.addedValue = null;
      }
    },
    removeFromCart: async (state, action) => {
      try {
        let res = await axios.delete(
          `http://localhost:8080/api/ecommerce/cart/remove/${action.payload}`,
          { withCredentials: true }
        );
        state.value = !state.value;
      } catch (error) {
        ``;
        console.log(error);
      }
    },
  },
});

export const { removeFromCart, addToCart } = cartSlice.actions;
export default cartSlice.reducer;

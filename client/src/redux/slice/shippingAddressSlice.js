import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};
const shippingAddressSlice = createSlice({
  name: "shippingAddress",
  initialState,
  reducers: {
    fetchAddressSuccess: (state, action) => {
      state.value = action.payload;
    },
    fetchAddressFailure: (state) => {
      state.value = null;
    },
  },
});

export const { fetchAddressSuccess, fetchAddressFailure } =
  shippingAddressSlice.actions;
export default shippingAddressSlice.reducer;

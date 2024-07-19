import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};
const sellerSlice = createSlice({
  name: "value",
  initialState,
  reducers: {
    sellerLoginSuccess: (state, action) => {
      state.value = action.payload;
    },
    sellerLoginFailure: (state) => {
      state.value = null;
    },
  },
});

export const { sellerLoginSuccess, sellerLoginFailure } = sellerSlice.actions;

export default sellerSlice.reducer;

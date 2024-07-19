import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};
const buyingProductDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    setDetail: (state, action) => {
      state.value = action.payload;
    },
    unSetDetail: (state, action) => {
      state.value = null;
    },
  },
});

export const { setDetail, unSetDetail } = buyingProductDetailSlice.actions;
export default buyingProductDetailSlice.reducer;

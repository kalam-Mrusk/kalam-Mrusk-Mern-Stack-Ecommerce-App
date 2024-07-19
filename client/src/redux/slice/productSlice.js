import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchDataSuccess: (state, action) => {
      state.value = action.payload;
    },
    fetchDataFailure: (state, action) => {
      state.value = [];
    },
  },
});

export const { fetchDataSuccess, fetchDataFailure } = productSlice.actions;
export default productSlice.reducer;

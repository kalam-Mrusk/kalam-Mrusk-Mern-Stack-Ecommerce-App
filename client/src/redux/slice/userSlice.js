import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};
const userSlice = createSlice({
  name: "value",
  initialState,
  reducers: {
    userLoginSuccess: (state, action) => {
      state.value = action.payload;
    },
    userLoginFailure: (state) => {
      state.value = null;
    },
  },
});

export const { userLoginSuccess, userLoginFailure } = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    currentOrder: null,
    isProcessing: false,
    error: false,
  },
  reducers: {
    checkoutStart: (state) => {
      state.isProcessing = true;
    },

    checkoutSuccess: (state, action) => {
      state.isProcessing = false;
      state.currentOrder = action.payload;
      state.error = false;
    },

    checkoutFailure: (state) => {
      state.isProcessing = false;
      state.error = true;
      state.currentOrder = null;
    },
  },
});

export const { checkoutStart, checkoutSuccess, checkoutFailure } =
  orderSlice.actions;
export default orderSlice.reducer;

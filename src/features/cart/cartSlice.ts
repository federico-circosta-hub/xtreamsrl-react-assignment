import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CartResponse } from "../../app/types";

const initialState: CartResponse = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    changeCart: (state, action: PayloadAction<CartResponse>) => {
      state.items = action.payload.items;
      state.totalItems = action.payload.totalItems;
      state.totalPrice = action.payload.totalPrice;
    },
  },
});

export const { changeCart } = cartSlice.actions;

export default cartSlice.reducer;

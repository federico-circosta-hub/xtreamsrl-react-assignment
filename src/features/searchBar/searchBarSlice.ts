import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface searchBarState {
  value: string;
}

const initialState: searchBarState = {
  value: "",
};

export const searchBarSlice = createSlice({
  name: "searchBar",
  initialState,
  reducers: {
    changeValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { changeValue } = searchBarSlice.actions;

export default searchBarSlice.reducer;

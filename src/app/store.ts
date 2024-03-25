import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { appApi } from "../api/apiSlice";
import searchBarReducer from "../features/searchBar/searchBarSlice";
import cartReducer from "../features/cart/cartSlice";
import categoryReducer from "../features/category/categorySlice";

export const store = configureStore({
  reducer: {
    [appApi.reducerPath]: appApi.reducer,
    searchBar: searchBarReducer,
    cart: cartReducer,
    category: categoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware),
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

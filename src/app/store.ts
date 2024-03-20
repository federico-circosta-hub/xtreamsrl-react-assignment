import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { appApi } from "../api/apiSlice";
import searchBarReducer from "../features/searchBar/searchBarSlice";

export const store = configureStore({
  reducer: {
    [appApi.reducerPath]: appApi.reducer,
    searchBar: searchBarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware),
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

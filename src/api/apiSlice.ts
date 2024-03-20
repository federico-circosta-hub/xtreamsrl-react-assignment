import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../Products";
import { searchBarState } from "../features/searchBar/searchBarSlice";

interface productsResponse {
  hasMore: boolean;
  products: Product[];
  total: number;
}

export const appApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5173/" }),
  endpoints: (builder) => ({
    getProducts: builder.query<
      productsResponse,
      { limit: number; page: number; query: string }
    >({
      query: ({ limit, page, query }) =>
        `products?limit=${limit}&page=${page}&q=${query}`,
    }),
  }),
});

export const { useGetProductsQuery } = appApi;

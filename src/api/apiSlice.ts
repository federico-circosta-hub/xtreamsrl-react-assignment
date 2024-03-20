import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../Products";

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
      { limit: number; page: number }
    >({
      query: ({ limit, page }) => `products?limit=${limit}&page=${page}`,
    }),
  }),
});

export const { useGetProductsQuery } = appApi;

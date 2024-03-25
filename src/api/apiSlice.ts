import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../app/types";

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
      { limit: number; page: number; query: string; category: string }
    >({
      query: ({ limit, page, query, category }) =>
        `products?limit=${limit}&page=${page}&q=${query}&category=${category}`,
    }),
    cart: builder.mutation({
      query: ({ cart }) => ({
        url: `cart`,
        method: "POST",
        body: cart,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useCartMutation } = appApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { FrontendProduct } from "backend/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}/api` }),
  endpoints: (builder) => ({
    getProducts: builder.query<FrontendProduct[], void>({
      query: () => "products",
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { FrontendProduct } from "backend/react";

import type { OrderSummary } from "@/types";

export type Order = {
  readonly nameOnCard: string;
  readonly cardInfo: string;
  readonly last4Digits: string;
  readonly cvv: string;
  readonly expiryDate: string;
  readonly address: string;
  readonly city: string;
  readonly state: string;
  readonly zip: string;
  readonly orderTotal: number;
  readonly product: string;
  readonly amount: number;
};

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}/api` }),
  endpoints: (builder) => ({
    getProducts: builder.query<FrontendProduct[], void>({
      query: () => "products",
    }),
    createOrder: builder.mutation<Order, Order>({
      query: (order) => ({
        url: "orders",
        method: "POST",
        body: {
          nameOnCard: order.nameOnCard,
          cardInfo: order.cardInfo,
          last4Digits: order.cardInfo?.slice(-4),
          cvv: order.cvv,
          expiryDate: order.expiryDate,
          address: order.address,
          city: order.city,
          state: order.state,
          amount: order.amount,
          zip: order.zip,
          orderTotal: order.orderTotal,
          product: order.product,
        },
      }),
    }),
    getOrders: builder.query<OrderSummary[], string>({
      query: (name) => `orders/${name}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateOrderMutation,
  useGetOrdersQuery,
} = productsApi;

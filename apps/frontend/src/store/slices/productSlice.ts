import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { FrontendProduct } from "backend/react";

export type Product = Pick<
  FrontendProduct,
  "id" | "name" | "imageUrl" | "stock" | "description" | "price"
> & { quantity: number };

const initialState: Product = {
  id: "",
  name: "",
  imageUrl: "",
  stock: 0,
  description: "",
  price: 0,
  quantity: 1,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (_, action: PayloadAction<Product>) => {
      return action.payload;
    },
    updateQuantity: (state: Product, action: PayloadAction<number>) => {
      if (state) {
        return { ...state, quantity: action.payload };
      }
      return state;
    },
    removeProduct: () => initialState,
  },
});

export const { addProduct, updateQuantity, removeProduct } =
  productSlice.actions;

export default productSlice.reducer;

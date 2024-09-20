import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { Product } from "@/types";

export type SliceProduct = Pick<
  Product,
  "id" | "name" | "imageUrl" | "stock" | "description" | "price"
> & { quantity: number };

const initialState: SliceProduct = {
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
    addProduct: (_, action: PayloadAction<SliceProduct>) => {
      return action.payload;
    },
    updateQuantity: (state: SliceProduct, action: PayloadAction<number>) => {
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

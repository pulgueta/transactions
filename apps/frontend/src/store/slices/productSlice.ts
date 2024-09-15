import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { FrontendProduct } from "backend/react";

export type Product = Pick<
  FrontendProduct,
  "id" | "name" | "imageUrl" | "stock" | "description" | "price"
>;

export type FormState = Product[] | undefined;

const initialState: FormState = [];

const saveState = (state: FormState) => {
  localStorage.setItem("products", JSON.stringify(state));
};

const loadState = (): FormState => {
  const savedState = localStorage.getItem("products");

  return savedState ? JSON.parse(savedState) : initialState;
};

const productSlice = createSlice({
  name: "form",
  initialState: loadState(),
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      if (!state) {
        state = [];
      }

      state.push(action.payload);

      saveState(state);
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      if (state) {
        const updatedState = state.filter(
          (product) => product.id !== action.payload
        );

        saveState(updatedState);

        return updatedState;
      }
    },
    resetProducts: () => {
      localStorage.removeItem("products");
      return initialState;
    },
  },
});

export const { addProduct, resetProducts, removeProduct } =
  productSlice.actions;
export default productSlice.reducer;

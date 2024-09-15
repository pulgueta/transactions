import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

type QuantityState = {
  [productId: string]: number;
};

const initialState: QuantityState = {};

const quantitySlice = createSlice({
  name: "quantity",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      if (!state[productId]) state[productId] = 1;
      state[productId] += 1;
    },
    decrement: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      if (state[productId] && state[productId] > 1) {
        state[productId] -= 1;
      }
    },
    setQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      state[action.payload.productId] = action.payload.quantity;
    },
  },
});

export const { increment, decrement, setQuantity } = quantitySlice.actions;
export default quantitySlice.reducer;

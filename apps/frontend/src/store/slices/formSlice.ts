import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { OrderSummary } from "@/types";

export type FormState = Pick<
  OrderSummary,
  | "address"
  | "cardInfo"
  | "city"
  | "cvv"
  | "expiryDate"
  | "nameOnCard"
  | "state"
  | "zip"
>;

const initialState: FormState = {
  nameOnCard: "",
  cardInfo: "",
  expiryDate: "",
  cvv: "",
  address: "",
  city: "",
  state: "",
  zip: "",
};

const saveState = (state: FormState) => {
  localStorage.setItem("customerDetails", JSON.stringify(state));
};

const loadState = (): FormState => {
  const savedState = localStorage.getItem("customerDetails");

  return savedState ? JSON.parse(savedState) : initialState;
};

const formSlice = createSlice({
  name: "form",
  initialState: loadState(),
  reducers: {
    updateFormField: (
      state,
      action: PayloadAction<{ field: keyof FormState; value: string }>
    ) => {
      state[action.payload.field] = action.payload.value;
      saveState(state);
    },
    resetForm: () => initialState,
  },
});

export const { updateFormField, resetForm } = formSlice.actions;
export default formSlice.reducer;

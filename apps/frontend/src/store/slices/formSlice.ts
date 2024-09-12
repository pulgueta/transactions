import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CreateOrder } from "@store/shared/types";

export type FormState = Pick<
  CreateOrder,
  | "nameOnCard"
  | "cardInfo"
  | "cvv"
  | "expiryDate"
  | "address"
  | "city"
  | "state"
  | "zip"
>;

const initialState: FormState = {
  nameOnCard: "",
  cardInfo: "",
  cvv: "",
  expiryDate: "",
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

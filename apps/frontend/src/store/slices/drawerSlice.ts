import { createSlice } from "@reduxjs/toolkit";

export type FormState = boolean;

const initialState: FormState = false;

const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    openDrawer: () => true,
    closeDrawer: () => false,
  },
});

export const { closeDrawer, openDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;

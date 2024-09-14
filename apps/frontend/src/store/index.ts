import { configureStore } from "@reduxjs/toolkit";

import formReducer from "./slices/formSlice";
import drawerReducer from "./slices/drawerSlice";

export const store = configureStore({
  reducer: {
    form: formReducer,
    drawer: drawerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

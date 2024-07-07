import { configureStore } from "@reduxjs/toolkit";
import codeEditorSlice from "../Reducers/CodeDataReducer";

export const store = configureStore({
  reducer: {
    codeEditorSlice,
  },
});

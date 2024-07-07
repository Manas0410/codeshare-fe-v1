import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  code: "CHOOTUUUUUUUUUUUUUUUUUU",
  isEdittingEnabled: true,
};

const codeEditorSlice = createSlice({
  name: "codeEditorSlice",
  initialState,
  reducers: {
    updateCode: (state, action) => {
      state.code = action.payload;
    },
    toggleEditing: (state, action) => {
      state.isEdittingEnabled = action.payload;
    },
  },
});

export const { updateCode, toggleEditing } = codeEditorSlice.actions;
export default codeEditorSlice.reducer;

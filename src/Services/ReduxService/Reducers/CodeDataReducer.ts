import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  code: "CHOOTUUUUUUUUUUUUUUUUUU",
  isEdittingEnabled: true,
  userIdOfMaker: "",
  editorLanguage: "",
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
    setUserIdOfMaker: (state, action) => {
      state.userIdOfMaker = action.payload;
    },
    setEditorLanguage: (state, action) => {
      state.editorLanguage = action.payload;
    },
  },
});

export const {
  updateCode,
  toggleEditing,
  setUserIdOfMaker,
  setEditorLanguage,
} = codeEditorSlice.actions;
export default codeEditorSlice.reducer;

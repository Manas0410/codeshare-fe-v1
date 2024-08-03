import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { decodeKey } from "../../../utils/HASHfilename";

// const initialState = {
//   code: {},
//   isEdittingEnabled: true,
//   userIdOfMaker: "",
//   editorLanguage: "",
//   //
//   selectedFile: "",
// };

// const codeEditorSlice = createSlice({
//   name: "codeEditorSlice",
//   initialState,
//   reducers: {
//     updateCode: (state, action) => {
//       state.code = action.payload;
//     },
//     toggleEditing: (state, action) => {
//       state.isEdittingEnabled = action.payload;
//     },
//     setUserIdOfMaker: (state, action) => {
//       state.userIdOfMaker = action.payload;
//     },
//     setEditorLanguage: (state, action) => {
//       state.editorLanguage = action.payload;
//     },
//     //
//     setSelectedFile: (state, action) => {
//       state.selectedFile = action.payload;
//     },
//   },
// });

// export const {
//   updateCode,
//   toggleEditing,
//   setUserIdOfMaker,
//   setEditorLanguage,
//   setSelectedFile,
// } = codeEditorSlice.actions;
// export default codeEditorSlice.reducer;

// // functions to retrieve data
// // export const selectEditorLanguage = (state: any) =>
// //   state.codeEditorSlice.editorLanguage;

interface FileData {
  name: string;
  languageName: string;
  isEditable: boolean;
  data: string;
}

export interface CodeEditorState {
  codeData: Record<string, FileData>;
  selectedFile: string;
  userIdOfMaker: string;
}

// Initial state
const initialState: CodeEditorState = {
  codeData: {
    ["code1.txt"]: {
      name: "code1.txt",
      languageName: "",
      isEditable: false,
      data: "",
    },
  },
  selectedFile: "code1.txt",
  userIdOfMaker: "",
};

const codeEditorSlice = createSlice({
  name: "codeEditorSlice",
  initialState,
  reducers: {
    updateCodeData: (
      state,
      action: PayloadAction<Record<string, FileData>>
    ) => {
      const decodedCodeData: Record<string, FileData> = {};
      console.log(action.payload, "apl");
      for (const [encodedKey, fileData] of Object.entries(action.payload)) {
        const decodedKey = decodeKey(encodedKey);
        decodedCodeData[decodedKey] = fileData;
      }

      state.codeData = structuredClone(decodedCodeData);
    },

    setSelectedFile: (state, action: PayloadAction<string>) => {
      state.selectedFile = action.payload;
    },

    setUserIdOfMaker: (state, action: PayloadAction<string>) => {
      state.userIdOfMaker = action.payload;
    },
  },
});

export const { updateCodeData, setSelectedFile, setUserIdOfMaker } =
  codeEditorSlice.actions;
export default codeEditorSlice.reducer;

// Selectors to retrieve properties of the selected file
export const getEditorLanguage = (state: {
  codeEditorSlice: CodeEditorState;
}) => {
  const selectedFile = state.codeEditorSlice.selectedFile;
  return state.codeEditorSlice.codeData[selectedFile]?.languageName || "";
};

export const getIsEditable = (state: { codeEditorSlice: CodeEditorState }) => {
  const selectedFile = state.codeEditorSlice.selectedFile;
  return state.codeEditorSlice.codeData[selectedFile]?.isEditable || false;
};

export const getData = (state: { codeEditorSlice: CodeEditorState }) => {
  const selectedFile = state.codeEditorSlice.selectedFile;
  return state.codeEditorSlice.codeData[selectedFile]?.data || "";
};

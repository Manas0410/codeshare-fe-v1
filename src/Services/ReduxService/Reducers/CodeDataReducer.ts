import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { decodeKey } from "../../../utils/HASHfilename";

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

    upDateDataOfFile: (state, action: PayloadAction<string>) => {
      const selectedFile = state.selectedFile;
      state.codeData[selectedFile].data = action.payload;
    },

    updateLanguageOfFile: (state, action: PayloadAction<string>) => {
      const selectedFile = state.selectedFile;
      state.codeData[selectedFile].languageName = action.payload;
    },

    updateEditableStateOfFile: (state, action: PayloadAction<boolean>) => {
      const selectedFile = state.selectedFile;
      state.codeData[selectedFile].isEditable = action.payload;
    },

    addNewFile: (state, action: PayloadAction<FileData>) => {
      state.codeData[action.payload.name] = action.payload;
    },

    deletefile: (state) => {
      const { [state.selectedFile]: deleted, ...remainingFiles } =
        state.codeData;
      state.codeData = remainingFiles;
    },
  },
});

export const {
  updateCodeData,
  setSelectedFile,
  setUserIdOfMaker,
  upDateDataOfFile,
  addNewFile,
  deletefile,
  updateLanguageOfFile,
  updateEditableStateOfFile,
} = codeEditorSlice.actions;
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

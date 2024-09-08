import React from "react";
import { Languages } from "../constants/languages";
import { callAPI } from "../utils/callAPI";
import { useParams } from "react-router-dom";
import { socket } from "../Services/SocketIOservice/ManageSocketCalls";
import { useDispatch, useSelector } from "react-redux";
import SearchableDropdown from "./ui/Dropdown";
import {
  CodeEditorState,
  getEditorLanguage,
  updateLanguageOfFile,
} from "../Services/ReduxService/Reducers/CodeDataReducer";
import { encodeKey } from "../utils/HASHfilename";

const LanguageSelector: React.FC = () => {
  const { unicode } = useParams();
  const dispatch = useDispatch();

  const codeLanguage = useSelector((state: any) => getEditorLanguage(state));

  const selectedFile = useSelector(
    (state: { codeEditorSlice: CodeEditorState }) =>
      state.codeEditorSlice.selectedFile
  );

  const sendLanguageDataToServer = async (language: string) => {
    await callAPI(`/update`, "put", {
      urlCode: unicode,
      fileData: {
        name: encodeKey(selectedFile),
        languageName: language,
      },
    });
    socket.emit("send_message", { message: "Hello from client" });
  };

  const handleChange = async (value: string) => {
    await sendLanguageDataToServer(value);
    dispatch(updateLanguageOfFile(value));
  };

  return (
    <div>
      <SearchableDropdown
        options={Languages}
        selectedVal={codeLanguage}
        handleChange={(val) => handleChange(val || "")}
      />
    </div>
  );
};

export default LanguageSelector;

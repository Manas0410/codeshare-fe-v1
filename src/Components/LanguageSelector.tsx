import React from "react";
import { Languages } from "../constants/languages";
import { callAPI } from "../utils/callAPI";
import { useParams } from "react-router-dom";
import { socket } from "../Services/SocketIOservice/ManageSocketCalls";
import { useDispatch, useSelector } from "react-redux";
import SearchableDropdown from "./ui/Dropdown";
import { updateLanguageOfFile } from "../Services/ReduxService/Reducers/CodeDataReducer";

const LanguageSelector: React.FC = () => {
  const { unicode } = useParams();
  const dispatch = useDispatch();

  const language = useSelector(
    (state: any) => state.codeEditorSlice.editorLanguage
  );

  const sendLanguageDataToServer = async (language: string) => {
    await callAPI(`/update`, "put", {
      languageName: language,
      urlCode: unicode,
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
        selectedVal={language}
        handleChange={(val) => handleChange(val || "")}
      />
    </div>
  );
};

export default LanguageSelector;

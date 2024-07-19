import React, { useState } from "react";
import { Languages } from "../constants/languages";
import { callAPI } from "../utils/callAPI";
import { useParams } from "react-router-dom";
import { socket } from "../Services/SocketIOservice/ManageSocketCalls";
import { setEditorLanguage } from "../Services/ReduxService/Reducers/CodeDataReducer";
import { useDispatch } from "react-redux";
import SearchableDropdown from "./ui/Dropdown";

const LanguageSelector: React.FC = () => {
  const { unicode } = useParams();
  const dispatch = useDispatch();

  const [value, setValue] = useState<string | null>(null);

  const sendLanguageDataToServer = async (language: string) => {
    await callAPI(`/update`, "put", {
      languageName: language,
      urlCode: unicode,
    });
    socket.emit("send_message", { message: "Hello from client" });
  };

  const handleChange = async (value: string) => {
    await sendLanguageDataToServer(value);
    dispatch(setEditorLanguage(value));
    setValue(value);
  };

  return (
    <div>
      <SearchableDropdown
        options={Languages}
        selectedVal={value}
        handleChange={(val) => handleChange(val || "")}
      />
    </div>
  );
};

export default LanguageSelector;
import Editor from "@monaco-editor/react";
import { useDispatch, useSelector } from "react-redux";
import { updateCode } from "../Services/ReduxService/Reducers/CodeDataReducer";
import { callAPI } from "../utils/callAPI";
import { useParams } from "react-router-dom";
import { socket } from "../Services/SocketIOservice/ManageSocketCalls";

let timer: any = null;

const CutomEditor = () => {
  const dispatch = useDispatch();
  const codeVal = useSelector((state: any) => state.codeEditorSlice.code);
  const { unicode } = useParams();

  const sendDataToServer = async (codeVal: string) => {
    await callAPI(`/update`, "put", {
      sharedData: codeVal,
      urlCode: unicode,
      languageName: "plainText",
      isEditable: true,
    });
    socket.emit("send_message", { message: "Hello from client" });
  };

  function handleEditorChange(value: string) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      dispatch(updateCode(value));
      sendDataToServer(value);
    }, 500);
  }

  return (
    <Editor
      height="97vh"
      theme="vs-dark"
      defaultLanguage="javascript"
      value={codeVal}
      onChange={(value) => handleEditorChange(value || "")}
    />
  );
};

export default CutomEditor;

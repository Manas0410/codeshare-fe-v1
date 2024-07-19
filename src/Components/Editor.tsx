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
  const isEdittingEnabled = useSelector(
    (state: any) => state.codeEditorSlice.isEdittingEnabled
  );
  const codeLanguage = useSelector(
    (state: any) => state.codeEditorSlice.editorLanguage
  );

  const { unicode } = useParams();

  const sendCodeDataToServer = async (codeVal: string) => {
    await callAPI(`/update`, "put", {
      sharedData: codeVal,
      urlCode: unicode,
    });
    socket.emit("send_message", { message: "Hello from client" });
  };

  function handleEditorChange(value: string) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      dispatch(updateCode(value));
      sendCodeDataToServer(value);
    }, 500);
  }

  return (
    <Editor
      height="100vh"
      theme="vs-dark"
      language={codeLanguage}
      value={codeVal}
      onChange={(value) => handleEditorChange(value || "")}
      options={{
        readOnly: isEdittingEnabled,
      }}
    />
  );
};

export default CutomEditor;

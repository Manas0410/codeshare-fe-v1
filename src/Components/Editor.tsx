import Editor from "@monaco-editor/react";
import { useDispatch, useSelector } from "react-redux";
import {
  CodeEditorState,
  getData,
  getEditorLanguage,
  getIsEditable,
  upDateDataOfFile,
} from "../Services/ReduxService/Reducers/CodeDataReducer";
import { callAPI } from "../utils/callAPI";
import { useParams } from "react-router-dom";
import { socket } from "../Services/SocketIOservice/ManageSocketCalls";
import { useUser } from "../Hooks/auth/useUser";
import { encodeKey } from "../utils/HASHfilename";

let timer: any = null;

const CutomEditor = () => {
  const dispatch = useDispatch();

  const codeVal = useSelector((state: any) => getData(state));
  const isEdittingEnabled = useSelector((state: any) => getIsEditable(state));
  const codeLanguage = useSelector((state: any) => getEditorLanguage(state));

  const userIdOfMaker = useSelector(
    (state: any) => state.codeEditorSlice.userIdOfMaker
  );
  const selectedFile = useSelector(
    (state: { codeEditorSlice: CodeEditorState }) =>
      state.codeEditorSlice.selectedFile
  );

  const { user } = useUser();

  const { unicode } = useParams();

  const sendCodeDataToServer = async (codeVal: string) => {
    await callAPI(`/update`, "put", {
      urlCode: unicode,
      fileData: {
        name: encodeKey(selectedFile),
        data: codeVal,
      },
    });
    socket.emit("send_message", { message: "Hello from client" });
  };

  function handleEditorChange(value: string) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      dispatch(upDateDataOfFile(value));
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
        readOnly: userIdOfMaker !== user?.uid && !isEdittingEnabled,
      }}
    />
  );
};

export default CutomEditor;

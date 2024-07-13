import Editor from "@monaco-editor/react";
import { useDispatch, useSelector } from "react-redux";
import { updateCode } from "../Services/ReduxService/Reducers/CodeDataReducer";

let timer: any = null;

const CutomEditor = () => {
  const dispatch = useDispatch();
  const codeVal = useSelector((state: any) => state.codeEditorSlice.code);

  function handleEditorChange(value: string, event: any) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => dispatch(updateCode(value)), 500);
  }

  return (
    <Editor
      height="97vh"
      theme="vs-dark"
      defaultLanguage="javascript"
      value={codeVal}
      // @ts-ignore
      onChange={handleEditorChange}
      // options={{ readOnly: true }}
    />
  );
};

export default CutomEditor;

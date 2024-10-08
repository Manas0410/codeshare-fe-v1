import { useSelector } from "react-redux";
import { CutomEditor, FileSelector } from "..";
import ManageSocketCalls from "../Services/SocketIOservice/ManageSocketCalls";
import { CodeEditorState } from "../Services/ReduxService/Reducers/CodeDataReducer";
import DeletedFileFallBack from "../Components/ui/DeletedFileFallBack";

const CodeEditorPage = () => {
  const filedata = useSelector(
    (state: { codeEditorSlice: CodeEditorState }) =>
      state.codeEditorSlice.codeData
  );
  const selectedFile = useSelector(
    (state: { codeEditorSlice: CodeEditorState }) =>
      state.codeEditorSlice.selectedFile
  );
  return (
    <section>
      <FileSelector />
      {!!filedata[selectedFile] ? (
        <ManageSocketCalls>
          <CutomEditor />
        </ManageSocketCalls>
      ) : (
        <DeletedFileFallBack />
      )}
    </section>
  );
};

export default CodeEditorPage;

// jese hi is page p aay get data

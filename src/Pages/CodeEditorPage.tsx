import { CutomEditor, FileSelector } from "..";
import ManageSocketCalls from "../Services/SocketIOservice/ManageSocketCalls";

const CodeEditorPage = () => {
  return (
    <section>
      <FileSelector />
      <ManageSocketCalls>
        {/* <CutomEditor /> */}
        <div></div>
      </ManageSocketCalls>
    </section>
  );
};

export default CodeEditorPage;

// jese hi is page p aay get data

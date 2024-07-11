import { useParams } from "react-router-dom";
import CutomEditor from "../Components/Editor";

const CodeEditorPage = () => {
  const { unicode } = useParams();
  return (
    <section>
      <CutomEditor />
    </section>
  );
};

export default CodeEditorPage;
// http://3.110.223.149:3000/

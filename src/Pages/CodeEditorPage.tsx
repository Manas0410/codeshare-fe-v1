import { useParams } from "react-router-dom";
import CutomEditor from "../Components/Editor";

const CodeEditorPage = () => {
  const { unicode } = useParams();
  console.log(unicode);
  return (
    <section>
      <CutomEditor />
    </section>
  );
};

export default CodeEditorPage;

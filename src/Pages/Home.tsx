import { useNavigate } from "react-router-dom";
import { useUser } from "../Hooks/auth/useUser";
import Toggle from "../common/Toggle";
import { generateUniqueCode } from "../utils/uniqueCodeGenerator";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const moveToeditor = () => {
    const unicode = generateUniqueCode(6);
    navigate(`/editor/${unicode}`);
  };

  return (
    <div>
      home page {user?.displayName} <Toggle />
      <button className="" onClick={moveToeditor}>
        {" "}
        Editor
      </button>
    </div>
  );
};

export default Home;

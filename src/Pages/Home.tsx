import { useNavigate } from "react-router-dom";
import { useUser } from "../Hooks/auth/useUser";
import Toggle from "../common/Toggle";
import { generateUniqueCode } from "../utils/uniqueCodeGenerator";
import useAPIcall from "../Hooks/useAPIcall";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  console.log(user?.uid);

  const moveToeditor = () => {
    const unicode = generateUniqueCode(6);
    const { IsLoading, Response, IsSuccessfullyFetched } = useAPIcall(
      "/post",
      "post",
      {
        urlCode: unicode,
        sharedData: "",
        languageName: "plaintext",
        isEditable: false,
        userId: "asd",
      }
    );

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

import { useNavigate } from "react-router-dom";
import { useUser } from "../Hooks/auth/useUser";
import Toggle from "../common/Toggle";
import { generateUniqueCode } from "../utils/uniqueCodeGenerator";
import { callAPI } from "../utils/callAPI";
import { AxiosResponse } from "axios";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const moveToeditor = async () => {
    const unicode = generateUniqueCode(6);
    const res = await callAPI("/post", "post", {
      urlCode: unicode,
      sharedData: "asd",
      languageName: "plaintext",
      isEditable: false,
      userId: user?.uid,
    });
    if ((res as AxiosResponse)?.status === 201) navigate(`/editor/${unicode}`);
    // handle api error here
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

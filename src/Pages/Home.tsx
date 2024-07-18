import { useNavigate } from "react-router-dom";
import { useUser } from "../Hooks/auth/useUser";
import { generateUniqueCode } from "../utils/uniqueCodeGenerator";
import { callAPI } from "../utils/callAPI";
import { AxiosResponse } from "axios";
import { BoxesCore } from "../Components/ui/BackGroundBoxes";

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
    <section>
      <h1 className="text-white z-[1000]">Code Share</h1>

      <button className="" onClick={moveToeditor}>
        {" "}
        Editor
      </button>
      <BoxesCore />
    </section>
  );
};

export default Home;

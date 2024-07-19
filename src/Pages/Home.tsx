import { useNavigate } from "react-router-dom";
import { useUser } from "../Hooks/auth/useUser";
import { generateUniqueCode } from "../utils/uniqueCodeGenerator";
import { callAPI } from "../utils/callAPI";
import { AxiosResponse } from "axios";
import { Button } from "..";
import React, { Suspense } from "react";

const BoxesCore = React.lazy(() => import("../Components/ui/BackGroundBoxes"));

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
    <section className="w-full h-full ">
      <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50">
        <h1 className="text-white text-9xl z-20 font-semibold tracking-wide">
          Code Share
        </h1>
        <div className="mx-auto w-max mb-10">
          <Button onclick={moveToeditor} />
        </div>
      </div>
      <Suspense
        fallback={<div className="h-full w-full bg-[rgb(8,8,11)]"></div>}
      >
        <BoxesCore />
      </Suspense>
    </section>
  );
};

export default Home;

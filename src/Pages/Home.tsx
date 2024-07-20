import { useNavigate } from "react-router-dom";
import { useUser } from "../Hooks/auth/useUser";
import { generateUniqueCode } from "../utils/uniqueCodeGenerator";
import { callAPI } from "../utils/callAPI";
import { AxiosResponse } from "axios";
import { Button } from "..";
import React, { Suspense, useState } from "react";

const BoxesCore = React.lazy(() => import("../Components/ui/BackGroundBoxes"));

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [Loading, setLoading] = useState(false);

  const moveToeditor = async () => {
    setLoading(true);
    const unicode = generateUniqueCode(6);
    const res = await callAPI("/post", "post", {
      urlCode: unicode,
      sharedData: "asd",
      languageName: "plaintext",
      isEditable: false,
      userId: user?.uid,
    });
    if ((res as AxiosResponse)?.status === 201) {
      setLoading(false);
      navigate(`/editor/${unicode}`);
    }
    // handle api error here
  };

  return (
    <section className="w-full h-full ">
      <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50">
        <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20">
          Code Share
        </h1>
        <div className="mx-auto w-max mb-10">
          <Button onclick={moveToeditor} Loading={Loading} />
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

import { useState } from "react";
import { useUser } from "../Hooks/auth/useUser";

const UserProfilr = () => {
  const { user, logOut } = useUser();
  const name: string = user?.displayName?.split(" ")[0] || "";
  const [showButton, setshowButton] = useState(false);

  return (
    <section
      className="relative"
      onMouseEnter={() => setshowButton(true)}
      onMouseLeave={() => setshowButton(false)}
    >
      <div className="flex gap-4 items-center justify-center cursor-pointer">
        <p className="text-white font-semibold text-[18px]">{`Hii ${name} !!`}</p>
        <div className="bg-indigo-900 h-10 w-10 rounded-full p-2 text-white font-bold text-2xl flex justify-center items-center cursor-pointer">
          {name[0]}
        </div>
      </div>

      {showButton && (
        <button
          onClick={() => logOut()}
          className="absolute top-[100%] right-4 bg-slate-600 z-[1000] px-5 rounded text-white"
        >
          logout
        </button>
      )}
    </section>
  );
};

export default UserProfilr;

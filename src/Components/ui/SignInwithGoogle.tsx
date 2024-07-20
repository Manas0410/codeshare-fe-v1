import { useNavigate } from "react-router-dom";
import { useUser } from "../../Hooks/auth/useUser";
import g from "../../assets/google.svg";

const SignInwithGoogle = ({ navUrl }: { navUrl: string }) => {
  const { googleSignIn } = useUser();
  const navigate = useNavigate();

  const clickHandler = async () => {
    await googleSignIn();
    navigate(navUrl);
  };
  return (
    <>
      <div className="text-center text-gray-400 flex items-center gap-2 mt-4">
        <hr className="w-[45%]" /> <span>or</span>
        <hr className="w-[45%]" />
      </div>
      <button
        onClick={clickHandler}
        type="submit"
        className="bg-blue-500 w-[180px] m-auto mt-8 text-sm px-[3px] pr-3  text-white flex gap-3 h-[32px] justify-between items-center"
      >
        <img src={g} className="h-[26px] bg-white " /> Sign In with google
      </button>
    </>
  );
};

export default SignInwithGoogle;

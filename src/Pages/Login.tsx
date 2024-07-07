import { useEffect, useState } from "react";
import { SignIn, SignUp } from "../Components/LoginForms";

const Login = () => {
  const [IsSignUp, setIsSignUp] = useState(false);

  return (
    <section className="h-screen w-full  justify-center flex flex-col items-center">
      {IsSignUp ? <SignUp /> : <SignIn />}
      <p className="ftext-xs color-gray-100 mt-3">
        change login method ?{"  "}{" "}
        <button
          className="text-indigo-600"
          onClick={() => setIsSignUp(!IsSignUp)}
        >
          {IsSignUp ? "Sign In" : "Sign Up"}{" "}
        </button>
      </p>
    </section>
  );
};

export default Login;

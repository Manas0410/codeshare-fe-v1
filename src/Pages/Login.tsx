import { useState } from "react";
import { SignIn, SignUp } from "../Components/LoginForms";
import { useLocation } from "react-router-dom";

const Login = () => {
  const [IsSignUp, setIsSignUp] = useState(false);

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  return (
    <section className="h-screen w-full  justify-center flex flex-col items-center pattern-container">
      {IsSignUp ? <SignUp navUrl={from} /> : <SignIn navUrl={from} />}
      <p className="ftext-xs text-gray-100 mt-3">
        change login method ?{"  "}
        {"  "}
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

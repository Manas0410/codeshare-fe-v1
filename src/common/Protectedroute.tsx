import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../Hooks/auth/useUser";

const Protectedroute = () => {
  const { user } = useUser();
  console.log(user, "usr");
  if (user === null) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default Protectedroute;

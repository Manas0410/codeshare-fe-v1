import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../Hooks/auth/useUser";

const Protectedroute = () => {
  const { user } = useUser();
  if (user === null) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default Protectedroute;

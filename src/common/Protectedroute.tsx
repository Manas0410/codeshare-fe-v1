import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUser } from "../Hooks/auth/useUser";

const Protectedroute = () => {
  const { user } = useUser();
  const location = useLocation();

  if (user === null) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return <Outlet />;
};

export default Protectedroute;

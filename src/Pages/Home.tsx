import { useUser } from "../Hooks/auth/useUser";
import Toggle from "../common/Toggle";

const Home = () => {
  const { user } = useUser();
  return (
    <div>
      home page {user?.displayName} <Toggle />
    </div>
  );
};

export default Home;

import CodeEditorPage from "./Pages/CodeEditorPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Protectedroute from "./common/Protectedroute";
import { useUser } from "./Hooks/auth/useUser";
import Loader from "./common/Loader";
import Layout from "./common/Layout";

const App = () => {
  const { user, Loading } = useUser();
  return Loading ? (
    <Loader />
  ) : (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/login"
            element={user ? <Navigate to={"/"} /> : <Login />}
          />
          <Route path="/" element={<Protectedroute />}>
            <Route path="/" element={<Home />} />
            <Route path="/editor/:unicode" element={<CodeEditorPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

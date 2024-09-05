import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Protectedroute from "./common/Protectedroute";
import { useUser } from "./Hooks/auth/useUser";
import { CodeEditorPage, Home, Layout, Loader, Login } from ".";
import AudioRecorder from "./TemporaryAudioService.tsx/Audio";

const App = () => {
  const { user, loading } = useUser();
  return loading ? (
    <Loader />
  ) : (
    <Router>
      <Routes>
        <Route path="/test" element={<AudioRecorder />} />
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

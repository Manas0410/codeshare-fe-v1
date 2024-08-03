import loadable from "@loadable/component";

// pages
const Home = loadable(() => import("./Pages/Home"));
const Login = loadable(() => import("./Pages/Login"));
const CodeEditorPage = loadable(() => import("./Pages/CodeEditorPage"));

// components
const Loader = loadable(() => import("./common/Loader"));
const Layout = loadable(() => import("./common/Layout"));
const CutomEditor = loadable(() => import("./Components/Editor"));
const NavBar = loadable(() => import("./Components/NavBar"));
const Toggle = loadable(() => import("./Components/Toggle"));
const LanguageSelector = loadable(
  () => import("./Components/LanguageSelector")
);
const Button = loadable(() => import("./Components/ui/Button"));
const SignInwithGoogle = loadable(
  () => import("./Components/ui/SignInwithGoogle")
);
const MiniLoader = loadable(() => import("./Components/ui/MiniLoader"));
const Profile = loadable(() => import("./common/UserProfilr"));
const AddFileInput = loadable(() => import("./Components/ui/AddFileInput"));
const FileSettingsMenu = loadable(
  () => import("./Components/FileSettingsMenu")
);
const FileSelector = loadable(() => import("./Components/FileSelector"));

export {
  Home,
  Login,
  Loader,
  Layout,
  CodeEditorPage,
  CutomEditor,
  NavBar,
  Toggle,
  LanguageSelector,
  Button,
  SignInwithGoogle,
  MiniLoader,
  Profile,
  AddFileInput,
  FileSettingsMenu,
  FileSelector,
};

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
};

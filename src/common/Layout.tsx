import { Outlet } from "react-router-dom";
import { NavBar } from "..";

const Layout = () => {
  return (
    <section className="h-screen w-full relative">
      <NavBar />
      <Outlet />
      <a href="" target="_blank" className="absolute bottom-4 right-4">
        About Developer
      </a>
    </section>
  );
};

export default Layout;

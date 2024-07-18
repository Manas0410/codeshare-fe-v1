import { Outlet, useLocation } from "react-router-dom";
import { NavBar } from "..";

const Layout = () => {
  const { pathname } = useLocation();
  return (
    <section className="h-screen w-full relative overflow-hidden  bg-slate-900 ">
      {pathname.startsWith("/editor") && <NavBar />}
      <Outlet />
      <a
        href="https://www.linkedin.com/in/manas0410/"
        target="_blank"
        className="absolute bottom-4 right-4 text-white"
      >
        About Developer
      </a>
    </section>
  );
};

export default Layout;

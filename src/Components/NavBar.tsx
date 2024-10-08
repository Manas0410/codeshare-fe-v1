import { Profile } from "..";

const NavBar = () => {
  return (
    <section className="flex justify-between h-[60px] w-full bg-dark-2 px-8 items-center">
      <div className="text-white text-xl">SMxShare</div>
      <Profile />
    </section>
  );
};

export default NavBar;

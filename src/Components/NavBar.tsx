import { AlignJustify } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../Components/ui/sheet";
import { LanguageSelector, Profile, Toggle } from "..";

const NavBar = () => {
  return (
    <section className="flex justify-between h-[60px] w-full bg-dark-2 px-8 items-center">
      <Sheet>
        <SheetTrigger>
          <AlignJustify color="#ffffff" />
        </SheetTrigger>
        <SheetContent className="bg-dark-2 border-0">
          <p className="text-white text-xl">Editting Tools</p>
          <div className="flex w-full justify-start gap-6 items-center  h-max mt-16 mb-6">
            <div className="text-white mb-5 text-xl ">Allow Editting :</div>
            <Toggle />
          </div>
          <div>
            <div className="text-white mb-5 text-xl">Select Language :</div>
            <LanguageSelector />
          </div>
        </SheetContent>
      </Sheet>
      <Profile />
    </section>
  );
};

export default NavBar;

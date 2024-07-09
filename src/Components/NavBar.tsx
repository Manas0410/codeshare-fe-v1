import { AlignJustify } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../Components/ui/sheet";
import LanguageSelector from "../common/LanguageSelector";

const NavBar = () => {
  return (
    <section className="flex justify-between h-[7vh] w-full bg-black px-8 items-center">
      <div className="">
        <div className="name">SMxShare</div>
      </div>
      <Sheet>
        <SheetTrigger>
          <AlignJustify color="#ffffff" />
        </SheetTrigger>
        <SheetContent className=" border-0">
          cutuuu baby <LanguageSelector />
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default NavBar;

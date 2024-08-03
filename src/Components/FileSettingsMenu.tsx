import { Settings } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
// import { LanguageSelector, Toggle } from "..";

const MenuItems = () => {
  return (
    <section className="w-[350px] h-[450px] p-4 text-white">
      <div className="flex gap-4 mt-4 items-center pb-4">
        <p className="pb-4">Allow Editting :</p>
        {/* <Toggle /> */}
      </div>

      <p className="pb-2">Select Language :</p>
      {/* <LanguageSelector /> */}
    </section>
  );
};
const FileSettingsMenu = () => {
  return (
    <NavigationMenu className="dark">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="w-max h-full p-0 mt-2">
            <Settings className="h-[16px] w-[16px] " color="#ffffff" />
          </NavigationMenuTrigger>
          <NavigationMenuContent className="w-max">
            <MenuItems />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default FileSettingsMenu;

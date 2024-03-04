import AscentIcon from "../../assets/lightico.svg";
import AscentDarkIcon from "../../assets/darkIco.svg";
import { RiMenu3Fill } from "react-icons/ri";
import { ModeToggle } from "../them-modal-toggle";
import { useContext, useEffect, useState } from "react";
import {
  ThemeProviderContext,
  ThemeProviderState,
} from "@/shadcn/theme-provider";
import { Link, useLocation } from "react-router-dom";
import SignupModal from "../SignupModal";
import LoginModal from "../LoginModal";

const Header = () => {
  const [theme, setTheme] = useState<"dark" | "light" | "system">();
  const [landing, setisLanding] = useState<boolean>();
  const location = useLocation();
  const context: ThemeProviderState = useContext(ThemeProviderContext);
  useEffect(() => {
    setTheme(context?.theme);
  }, [context]);
  useEffect(() => {
    setisLanding(location.pathname === "/");
  }, [location]);
  return (
    <header
      className={`w-full mx-auto sticky top-0 left-0 z-10 ${
        landing
          ? "bg-accenting dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative"
          : ""
      }`}
    >
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <header
        className={`h-20 flex items-center justify-center  w-[90%] md:w-[85%] mx-auto`}
      >
        <div className="h-[90%] bg-transparent w-full  flex justify-between">
          <div className="flex items-center gap-20">
            <img src={theme === "light" ? AscentIcon : AscentDarkIcon} />

            <div className=" gap-10 hidden md:flex">
              <Link to={"/jobs"} className="text-textPrimary">
                Find Jobs
              </Link>
              <Link to={"/companies"} className="text-textPrimary">
                Brows companies
              </Link>
            </div>
          </div>

          <div className="flex items-center text-2xl gap-4 ">
            <div className="text-sm flex gap-4">
              <LoginModal/>

              <SignupModal />
            </div>
            <ModeToggle />
            <RiMenu3Fill className="md:hidden" />
          </div>
        </div>
      </header>
    </header>
  );
};
export default Header;

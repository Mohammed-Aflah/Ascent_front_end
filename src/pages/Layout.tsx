import Header from "@/components/common/Header";
import { Outlet } from "react-router-dom";
import AscentIcon from "../assets/lightico.svg";
import AscentDarkIcon from "../assets/darkIco.svg";
import { useContext, useEffect, useState } from "react";
import {
  ThemeProviderContext,
  ThemeProviderState,
} from "@/shadcn/theme-provider";
import { userSidebarLayout } from "@/constants/userSidLayout";
import { RiMenu3Fill } from "react-icons/ri";

const Layout = ({ role }: { role?: "user" | "admin" | "company" | null }) => {
  const [theme, setTheme] = useState<"dark" | "light" | "system">();
  const context: ThemeProviderState = useContext(ThemeProviderContext);
  useEffect(() => {
    setTheme(context?.theme);
  }, [context]);
  if (role === "user") {
    return (
      <main className=" grid grid-cols-8 ">
        <aside className="h-screen border-r flex flex-col pt-4 px-2 gap-5">
          <div className="flex justify-between items-center text-lg">
            <img
              src={theme === "light" ? AscentIcon : AscentDarkIcon}
              className="w-28"
            />
            <RiMenu3Fill className="cursor-pointer" />
          </div>
          <div className="flex flex-col gap-3  ">
            {userSidebarLayout.map((item) => (
              <div key={item.id} className="flex text-1xl items-center gap-4 hover:border-t hover:border-b py-2 cursor-pointer">
                {/* <Home /> <span>Home</span> */}
                
                <item.icon className="text-textPrimary"/> <span className="text-textPrimary">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="w-full h-[1px] bg-textPrimary"/>
          <div className="w-full flex flex-col mt-4">
            <div>
                <span className="uppercase font-semibold">settings</span>
            </div>
          </div>
        </aside>
        <main className="col-span-7">
          <Header />
          <Outlet />
        </main>
      </main>
    );
  } else {
    return (
      <main>
        <Header />
        <Outlet />
      </main>
    );
  }
};
export default Layout;

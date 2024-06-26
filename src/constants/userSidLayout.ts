import LogoutModal from "@/components/LogoutModal";
import {
  Home,
  MessageCircleCode,
  Search,
  BarChart,
  User,
  Settings,
  LogOut,
  HelpCircle,
  AppWindow,
  Bookmark,

} from "lucide-react";

import { ElementType } from "react";
import { v4 as uuidv4 } from "uuid";
type Labels = {
  id: string;
  label: string | ElementType;
  icon: ElementType;
  extraLabel?: string;
  link?: string;
};
export const userSidebarLayout: Labels[] = [
  {
    id: uuidv4(),
    label: "Home",
    icon: Home,
    link: "/",
  },
  {
    id: uuidv4(),
    label: "Messages",
    icon: MessageCircleCode,
    link: "messages",
  },
  {
    id: uuidv4(),
    label: "Find jobs",
    icon: Search,
    link: "findjobs?page=1&pageSize=5",
  },
  {
    id: uuidv4(),
    label: "Brows companies",
    icon: BarChart,
    link: "browscompanies",
  },
  {
    id: uuidv4(),
    label: "My profile",
    icon: User,
  },
  {
    id: uuidv4(),
    label: "My applications",
    icon: AppWindow ,
    link:"Myapplication"
  },
  {
    id: uuidv4(),
    label: "Bookmark",
    icon: Bookmark ,
    link:"savedjobs"
  },
];

export const useSidbarLayoutSection2: Labels[] = [
  {
    id: uuidv4(),
    label: "Settings",
    icon: Settings,
  },
  {
    id: uuidv4(),
    label: LogoutModal,
    icon: LogOut,
    extraLabel: "Logout",
  },
  {
    id: uuidv4(),
    label: "Help center",
    icon: HelpCircle,
  },
];

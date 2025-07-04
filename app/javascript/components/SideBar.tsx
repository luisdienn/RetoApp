// src/components/Sidebar.tsx
import { FaHome, FaUserFriends, FaSignOutAlt, FaListUl } from "react-icons/fa";
import { GiTrophy  } from "react-icons/gi";
import React from "react";

type NavItem = {
  icon: React.ReactNode;
  label: string;
  href: string;
};

type SidebarProps = {
  Name: string;
  Favicon: any;
  RetoLogo: any;
  isOpen: boolean;
  toggleSidebar: () => void;
};

const navItems: NavItem[] = [
  { icon: <FaHome />, label: "Dashboard", href: "/dashboard" },
  { icon: <FaUserFriends />, label: "Friends", href: "/friends" },
  { icon: <GiTrophy />, label: "World Cup", href: "/world_cup" },
  { icon: <FaListUl />, label: "Matches", href: "/matches" },
];

export default function Sidebar({ Name, Favicon, RetoLogo ,isOpen, toggleSidebar }: SidebarProps) {
  return (
<div
  className={`h-auto bg-black text-white flex flex-col justify-between py-6 px-4 transition-all duration-300
  fixed top-0 left-0 z-50 md:static translate-x-0
  ${isOpen ? "w-64" : "w-20"}`}
>

      {/* Logo */}
      <div>
        <div
          className="flex flex-col items-center gap-3 pt-8 cursor-pointer"
          onClick={toggleSidebar}
        >
          <img
            className={`transition-all duration-300 ${
              isOpen ? "w-28 sm:w-32 md:w-40" : "w-10"
            }`}
            src={isOpen ? RetoLogo : Favicon}
            alt="Logo"
          />
        </div>

        {/* Perfil */}
        <div  className={`flex flex-col items-center transition-all duration-300 py-16  ${isOpen ? "opacity-100" : "opacity-0 h-0 overflow-hidden"}`}>
          <div onClick={() => { window.location.href = "/profile"; }}  className="w-14 h-14 bg-gray-700 rounded-full mb-2 hover:cursor-pointer"></div>
          <p className="font-medium">{Name}</p>
        </div>

        {/* Menú */}
        <nav className={`flex flex-col ${isOpen ? "pl-10" : "items-center"} gap-6 text-sm font-small`}>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 text-white hover:text-[#f9e7b8] transition-all duration-300 ${
                isOpen ? "" : "justify-center"
              }`}
            >
              {item.icon}
              {isOpen && <span>{item.label}</span>}
            </a>
          ))}
        </nav>
      </div>

      {/* Log out */}
      <button
        onClick={() => { window.location.href = "/users/sign_out"; }}
        className={`flex items-center gap-3 text-sm text-white hover:text-[#f9e7b8] transition-all duration-300 hover:cursor-pointer ${
          isOpen ? "pl-10" : "justify-center"
        }`}
      >
        <FaSignOutAlt />
        {isOpen && <span>Log out</span>}
      </button>
    </div>
  );
}

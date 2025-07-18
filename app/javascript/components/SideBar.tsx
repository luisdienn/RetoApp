// src/components/Sidebar.tsx
import { FaHome, FaUserFriends, FaSignOutAlt, FaListUl } from "react-icons/fa";
import { GiTrophy } from "react-icons/gi";
import React from "react";
import { deleteRequest } from "../api";

type NavItem = {
  icon: React.ReactNode;
  label: string;
  href: string;
};

type SidebarProps = {
  user: any;
  Favicon: any;
  RetoLogo: any;
  isOpen: boolean;
  toggleSidebar: () => void;
};

const navItems: NavItem[] = [
  { icon: <FaHome />, label: "Dashboard", href: "/dashboard" },
  { icon: <FaUserFriends />, label: "Friends", href: "/friendships" },
  { icon: <GiTrophy />, label: "World Cup", href: "/world_cup" },
  { icon: <FaListUl />, label: "Matches", href: "/matches" },
];

export default function Sidebar({
  user,
  Favicon,
  RetoLogo,
  isOpen,
  toggleSidebar,
}: SidebarProps) {
  return (
    <div
      className={`h-dvh bg-black text-white flex flex-col justify-between py-6 px-4 transition-all duration-300
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
        <div
          className={`flex flex-col items-center transition-all duration-300 py-16  ${
            isOpen ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
          }`}
        >
          <div
            onClick={() => {
              window.location.href = "/profile";
            }}
            className="hover:cursor-pointer"
          >
            {user.image ? (
              <img
                src={user.image}
                alt={user.name}
                className="w-18 h-18 object-cover rounded-full"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-14 w-14 sm:h-24 sm:w-24 text-[#f9e7b8]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <p className="font-medium pt-2">{user.name}</p>
        </div>

        {/* Menú */}
        <nav
          className={`flex flex-col ${
            isOpen ? "pl-10" : "items-center"
          } gap-6 text-sm font-small`}
        >
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
        onClick={() => {
          document.cookie.split(";").forEach((cookie) => {
            const cookieName = cookie.split("=")[0];
            document.cookie = `${cookieName}=; expires=${Date.now}`;
          });
          sessionStorage.clear();
          localStorage.clear();
          window.location.href = "/users/sign_out";
        }}
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

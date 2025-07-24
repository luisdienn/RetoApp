import { FaHome, FaUserFriends, FaSignOutAlt } from "react-icons/fa";
import React from "react";

type NavItem = {
  icon: React.ReactNode;
  label: string;
  href: string;
};

type SidebarProps = {
  Favicon: any;
  RetoLogo: any;
  isOpen: boolean;
  toggleSidebar: () => void;
};

const navItems: NavItem[] = [
  { icon: <FaHome />, label: "Dashboard", href: "/admin" },
  { icon: <FaUserFriends />, label: "Users", href: "/admin/users" },
];

export default function AdminSidebar({
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
          className="flex flex-col items-center gap-3 pt-8 cursor-pointer pb-24"
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



        {/* Menu */}
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

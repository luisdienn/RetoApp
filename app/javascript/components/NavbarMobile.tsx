import React, { useState } from "react";
import { FaBars, FaTimes, FaHome, FaUserFriends, FaSignOutAlt, FaListUl } from "react-icons/fa";
import { GiTrophy } from "react-icons/gi";

const navItems = [
  { icon: <FaHome />, label: "Dashboard", href: "/dashboard" },
  { icon: <FaUserFriends />, label: "Friends", href: "/friendships" },
  { icon: <GiTrophy />, label: "World Cup", href: "/world_cup" },
  { icon: <FaListUl />, label: "Matches", href: "/matches" },
];

export default function NavbarMobile({ user, Favicon, RetoLogo }: any) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="w-full bg-black text-white flex items-center justify-center px-4 py-3 fixed top-0 z-50">
        <img
          src={Favicon}
          alt="Logo"
          className="w-10 cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </nav>

      {/* Overlay + Menu */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-90 flex flex-col items-center pt-20 text-white">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 text-white"
          >
            <FaTimes size={24} />
          </button>

          <img src={RetoLogo} alt="Logo" className="w-32 mb-6" />

          <nav className="flex flex-col gap-6 text-lg">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              </a>
            ))}
            <button
              onClick={() => {
                sessionStorage.clear();
                localStorage.clear();
                window.location.href = "/users/sign_out";
              }}
              className="flex items-center gap-2 mt-6 text-red-400"
            >
              <FaSignOutAlt />
              <span>Log out</span>
            </button>
          </nav>
        </div>
      )}
    </>
  );
}

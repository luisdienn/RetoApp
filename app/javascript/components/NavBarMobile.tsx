import React, { useState } from "react";
import { FaHome, FaUserFriends, FaSignOutAlt, FaListUl, FaUser } from "react-icons/fa";
import { GiTrophy } from "react-icons/gi";

const navItems = [
  { icon: <FaUser />, label: "Profile", href: "/profile" },
  { icon: <FaHome />, label: "Dashboard", href: "/dashboard" },
  { icon: <FaUserFriends />, label: "Friends", href: "/friendships" },
  { icon: <GiTrophy />, label: "World Cup", href: "/world_cup" },
  { icon: <FaListUl />, label: "Matches", href: "/matches" },
];

export default function NavbarMobile({Favicon, RetoLogo }: any) {
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

      {open && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-90 flex flex-col items-center pt-20 text-white">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 text-white"
          >
          </button>

          <img src={RetoLogo} alt="Logo" className="w-32 mb-6" />

          <nav className="flex flex-col gap-6 text-lg pt-20">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                <div className="flex items-center gap-3 pb-4">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              </a>
            ))}
            <button
              onClick={() => {
                window.location.href = "/users/sign_out";
              }}
              className=" absolute bottom-0 flex pb-12 items-center  gap-3 hover:text-[#f9e7b8] hover:cursor-pointer"
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

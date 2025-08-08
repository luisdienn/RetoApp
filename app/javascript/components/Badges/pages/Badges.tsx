import React from "react";
import { useState, useEffect } from "react";
import SideBar from "../../SideBar";
import NavbarMobile from "../../NavBarMobile";
import Matches from "../comps/Matches";
import Goals from "../comps/Goals";
import WorldCups from "../comps/WorldCups";

export default function Badges({ user, badges, Favicon, RetoLogo }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="flex overflow-hidden h-screen">
      {isMobile ? (
        <div className="">
          <NavbarMobile Favicon={Favicon} RetoLogo={RetoLogo} />
        </div>
      ) : (
        <SideBar
          user={user}
          Favicon={Favicon}
          RetoLogo={RetoLogo}
          isOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      )}
      <div className="flex-1 overflow-y-auto">
        <div className="min-h-screen bg-gray-100 px-12 py-20 ">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-gray-800">Badges</h1>
          </div>
          <p className=" text-gray-600">Try to collect them all!</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
            <Matches badges={badges} />
            <Goals badges={badges} />
            <WorldCups badges={badges} />
          </div>
        </div>
      </div>
    </div>
  );
}

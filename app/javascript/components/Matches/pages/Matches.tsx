import Table from "../comps/Table";

import AddButton from "../../AddButton";
import React from "react";
import { useState, useEffect } from "react";
import SideBar from "../../SideBar";
import AddMatchModal from "../../AddMatchModal";
import NavbarMobile from "../../NavBarMobile";


export default function Matches({ user, matches, Favicon, RetoLogo }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            <h1 className="text-4xl font-bold text-gray-800">Matches</h1>
            <AddButton onClick={() => setIsModalOpen(true)} />
          </div>
          <p className=" text-gray-600">This is your history</p>

          <div className="pt-10 ">
            <Table matches={matches} />
          </div>
          <AddMatchModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}

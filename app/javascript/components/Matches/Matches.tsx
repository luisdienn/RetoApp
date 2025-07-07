import Table from "./Table";

import AddButton from "../AddButton";
import React from "react";
import { useState } from "react";
import SideBar from "../SideBar";
import AddMatchModal from "../AddMatchModal";

export default function Matches({ Name, Favicon, RetoLogo }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <div className="flex ">
      <SideBar
        Name={Name}
        Favicon={Favicon}
        RetoLogo={RetoLogo}
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex-1">
        <div className="min-h-screen bg-gray-100 p-12">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-gray-800">Matches</h1>
            <AddButton onClick={() => setIsModalOpen(true)} />
          </div>
          <p className=" text-gray-600">This is your history</p>

          <div className="pt-10">
            <Table />
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

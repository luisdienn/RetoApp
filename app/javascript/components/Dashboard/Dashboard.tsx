

import Performance from "./Performance";
import RecentGame from "./RecentGame";
import TotalGoals from "./TotalGoals";
import TotalMatches from "./TotalMatches";
import TotalWC from "./TotalWC";

import AddButton from "../AddButton";
import React from "react";
import { useState } from "react";
import SideBar from "../SideBar";

export default function Dashboard({Name, Favicon, RetoLogo}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
          {/* Contenedor flex para h1 y botón */}
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-gray-800">
              Welcome back, {Name}!
            </h1>
            <AddButton />
          </div>
          <p className="mb-8 text-gray-600">Take a look at your performance</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="sm:col-span-2 lg:col-span-2 row-span-1 bg-black rounded-xl  p-6">
              <Performance />
            </div>

            <div className="bg-black rounded-xl  p-6">
              <RecentGame />
            </div>

            <div className="bg-black rounded-xl  p-6 flex items-center justify-center">
              <TotalGoals />
            </div>

            <div className="bg-black rounded-xl  p-6 flex items-center justify-center">
              <TotalMatches />
            </div>

            <div className="bg-black rounded-xl p-6 flex items-center justify-center">
              <TotalWC />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

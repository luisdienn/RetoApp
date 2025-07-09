import WCStatus from "./WCStatus";
import WCGames from "./WCGames";
import WCGoals from "./WCGoals";
import WCPlayed from "./WCPlayed";
import TotalWC from "../Dashboard/TotalWC";
import WCStreak from "./WCStreak";

import AddButton from "../AddButton";
import React from "react";
import { useState } from "react";
import SideBar from "../SideBar";
import AddMatchModal from "../AddMatchModal";

export default function WorldCup({ user, currentwc, matches, goals, winstreak, world_cups,totalwc, Favicon, RetoLogo }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);



  return (
    <div className="flex overflow-hidden h-screen">
      <SideBar
        user={user}
        Favicon={Favicon}
        RetoLogo={RetoLogo}
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex-1 overflow-y-auto">
        <div className="min-h-screen bg-gray-100 p-12">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-gray-800">World Cup</h1>
            <AddButton onClick={() => setIsModalOpen(true)} />
          </div>
          <p className=" text-gray-600">
            Take a look at where you are at your personal World Cup
          </p>

          <div className="pt-10 border-b border-gray-700">
            <h1 className="text-2xl font-bold text-gray-800">Right Now</h1>
          </div>

          <div className=" py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="bg-black rounded-xl  p-6">
              <WCStatus currentwc={currentwc}/>
            </div>
            <div className="bg-black rounded-xl  p-6">
              <WCGames matches={matches} />
            </div>
            <div className="bg-black rounded-xl p-6 flex flex-col items-center justify-center h-full">
              <WCGoals goals={goals} />
            </div>
          </div>

          <div className=" border-b border-gray-700">
            <h1 className="text-2xl font-bold text-gray-800">General</h1>
          </div>

          <div className=" py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="bg-black rounded-xl p-6 flex flex-col items-center justify-center h-full">
              <TotalWC world_cups={world_cups}/>
            </div>
            <div className="bg-black rounded-xl p-6 flex flex-col items-center justify-center h-full">
              <WCPlayed totalwc={totalwc} />
            </div>
            <div className="bg-black rounded-xl p-6 flex flex-col items-center justify-center h-full">
              <WCStreak winstreak={winstreak}/>
            </div>
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

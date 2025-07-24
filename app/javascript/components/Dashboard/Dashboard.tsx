import Performance from "./Performance";
import RecentGame from "./RecentGame";
import TotalGoals from "./TotalGoals";
import TotalMatches from "./TotalMatches";
import TotalWC from "./TotalWC";

import AddButton from "../AddButton";
import React from "react";
import { useState, useEffect } from "react";
import SideBar from "../SideBar";
import NavbarMobile from "../NavBarMobile";
import AddMatchModal from "../AddMatchModal";

export default function Dashboard({
  user,
  matchesyear,
  goalsyear,
  foulsyear,
  assistsyear,
  blockyear,
  passesyear,
  lastmatch,
  totalmatches,
  totalgoals,
  world_cups,
  Favicon,
  RetoLogo,
}) {
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
          <NavbarMobile
            Favicon={Favicon}
            RetoLogo={RetoLogo}
          />
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
        <div className="min-h-screen bg-gray-100 px-12 py-20">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-gray-800">
              Welcome back, {user.name}!
            </h1>
            <AddButton onClick={() => setIsModalOpen(true)} />
          </div>
          <p className="mb-8 text-gray-600">Take a look at your performance</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="sm:col-span-2 lg:col-span-2 row-span-1 bg-black rounded-xl  p-6">
              <Performance
                matchesyear={matchesyear}
                goalsyear={goalsyear}
                foulsyear={foulsyear}
                assistsyear={assistsyear}
                blockyear={blockyear}
                passesyear={passesyear}
              />
            </div>

            <div className="bg-black rounded-xl  p-6">
              <RecentGame lastmatch={lastmatch} />
            </div>

            <div className="bg-black rounded-xl  p-6 flex items-center justify-center">
              <TotalGoals totalgoals={totalgoals} />
            </div>

            <div className="bg-black rounded-xl  p-6 flex items-center justify-center">
              <TotalMatches totalmatches={totalmatches} />
            </div>

            <div className="bg-black rounded-xl p-6 flex items-center justify-center">
              <TotalWC world_cups={world_cups} />
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

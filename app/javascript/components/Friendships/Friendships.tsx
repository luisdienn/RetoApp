import AddButton from "../AddButton";
import React from "react";
import { useState } from "react";
import SideBar from "../SideBar";
import SearchBar from "./SearchBar";
import StatsTable from "./StatsTable";

export default function Friendships({ user,allusers, Favicon, RetoLogo }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = allusers.filter((u) =>
  u.email.toLowerCase().includes(searchTerm.toLowerCase())
);

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
            <h1 className="text-4xl font-bold text-gray-800">Friends</h1>
          </div>
          <p className=" text-gray-600">Time to check where are you standing</p>

          <div className="mt-6 mb-4 pb-5">
            <SearchBar
              value={searchTerm}
              placeholder="Search friends..."
              onChange={(e) => setSearchTerm(e.target.value)
              }
            />
          </div>

            <StatsTable />


        </div>
      </div>
    </div>
  );
}

import ProfileCard from "./ProfileCard";
import React from "react";
import { useState } from "react";
import SideBar from "../SideBar";

export default function Profile({ user,friends,notifications,requesters, totalmatches,world_cups, Favicon, RetoLogo }) {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
          <ProfileCard user={user} friends={friends} notifications={notifications} requesters={requesters} totalmatches={totalmatches} world_cups={world_cups}/>
        </div>
      </div>
    </div>
  );
}

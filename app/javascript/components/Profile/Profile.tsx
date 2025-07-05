import ProfileCard from "./ProfileCard";
import React from "react";
import { useState } from "react";
import SideBar from "../SideBar";

export default function Profile({ Name, Email, Favicon, RetoLogo }) {

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
          <ProfileCard Name={Name} Email={Email}/>
        </div>
      </div>
    </div>
  );
}

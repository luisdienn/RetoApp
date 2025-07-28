import ProfileCard from "../comps/ProfileCard";
import React from "react";
import { useState,useEffect } from "react";
import SideBar from "../../SideBar";
import NavbarMobile from "../../NavBarMobile";


export default function Profile({ user,friends,notifications,requesters, totalmatches,world_cups,badges, Favicon, RetoLogo }) {

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
        
        <div className={`min-h-screen bg-gray-100 px-12 ${isMobile? `pt-36 pb-12`:`py-14`} `}>
          <ProfileCard user={user} friends={friends} notifications={notifications} requesters={requesters} totalmatches={totalmatches} world_cups={world_cups} badges={badges}/>
        </div>
      </div>
    </div>
  );
}

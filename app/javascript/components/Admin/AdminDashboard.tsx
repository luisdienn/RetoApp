import React from "react";
import { useState, useEffect } from "react";
import AdminSidebar from "./AdminSideBar";
import TotalUsers from "./TotalUsers";
import UsersMonth from "./UsersMonth";
import ActiveUsers from "./ActiveUsers";
import AdminChart from "./AdminChart";
import AdminNavbarMobile from "./AdminNavbarMobile";

export default function AdminDashboard({ user, allusers, Favicon, RetoLogo }) {
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
          <AdminNavbarMobile Favicon={Favicon} RetoLogo={RetoLogo} />
        </div>
      ) : (
        <AdminSidebar
          Favicon={Favicon}
          RetoLogo={RetoLogo}
          isOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      )}
      <div className="flex-1 overflow-y-auto">
        <div className="min-h-screen bg-gray-100 px-12 py-20">
          {/* Contenedor flex para h1 y botón */}
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-gray-800">
              Welcome back Administrator!
            </h1>
          </div>
          <p className="mb-8 text-gray-600">Take a look at the stats</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="bg-black rounded-xl  p-6">
              {" "}
              <TotalUsers allusers={allusers} />
            </div>
            <div className="bg-black rounded-xl  p-6">
              <UsersMonth allusers={allusers} />
            </div>
            <div className="bg-black rounded-xl  p-6">
              <ActiveUsers allusers={allusers} />
            </div>
            <div className="sm:col-span-2 lg:col-span-3 row-span-1 bg-black rounded-xl  p-6">
              <AdminChart allusers={allusers} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

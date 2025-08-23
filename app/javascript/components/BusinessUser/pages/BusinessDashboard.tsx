import React from "react";
import { useState, useEffect } from "react";
import SideBar from "../comps/SideBar";
import NavbarMobile from "../comps/NavBarMobile";
import BookingsTable from "../comps/BookingsTable";

export default function BusinessDashboard({
  user,
  locations,
  fields,
  bookings,
  Favicon,
  RetoLogo,
}:any) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [location, setLocation] = useState("");
  const [field, setField] = useState("");

  const filterFields = fields.filter((f:any) => f.location_id === Number(location));


  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

console.log(bookings)


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
        <div className="min-h-screen bg-gray-100 px-12 py-20">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-gray-800">
              Welcome back, {user.name}!
            </h1>
          </div>
          <p className="mb-8 text-gray-600">Check your bookings</p>

          <BookingsTable bookings={bookings}/>
        </div>
      </div>
    </div>
  );
}

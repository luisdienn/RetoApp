import React from "react";
import { useState, useEffect } from "react";
import SideBar from "../comps/SideBar";
import NavbarMobile from "../comps/NavBarMobile";

export default function BusinessDashboard({
  user,
  locations,
  fields,
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

          <div className="flex items-center  py-4 gap-4">
            <div>
              <label className=" font-medium">Location</label>
              <select
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2 bg-white rounded hover:cursor-pointer"
                required
              >
                <option value="">Select a location</option>
                {locations.map((loc:any) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className=" font-medium mb-1">Field</label>
              <select
                disabled={location == "" ? true : false}
                name="field"
                value={field}
                onChange={(e) => setField(e.target.value)}
                className={`w-full p-2  rounded ${
                  location == ""
                    ? "cursor-not-allowed bg-gray-200 text-gray-400"
                    : "bg-white hover:cursor-pointer"
                }`}
                required
                aria-placeholder="Select field"
              >
                <option value="">Select field</option>
                {filterFields.map((f:any) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>
          </div>



          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"></div>
        </div>
      </div>
    </div>
  );
}

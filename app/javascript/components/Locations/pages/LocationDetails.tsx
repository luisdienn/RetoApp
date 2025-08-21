"use client";

import React, { useState, useEffect } from "react";
import NavbarMobile from "../../NavBarMobile";
import SideBar from "../../SideBar";
import Map from "../comps/Map";
import PhoneShift from "../comps/PhoneShift";
import Amenities from "../comps/Amenities";
import AccordionComp from "../comps/AccordionComp";
import Carousel from "../comps/Carousel";

export default function LocationDetails({
  user,
  location,
  fields,
  Favicon,
  RetoLogo,
}: any) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  console.log(fields);

  return (
    <div className="flex overflow-hidden h-screen">
      {isMobile ? (
        <NavbarMobile Favicon={Favicon} RetoLogo={RetoLogo} />
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
        <div className="relative">
          <img
            src={location.images[0]}
            alt="Banner"
            className="h-64 w-full object-cover brightness-70"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <h1 className="text-6xl font-bold">{location.name}</h1>
          </div>
        </div>

        <div className="min-h-screen bg-gray-100 px-12 py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="sm:col-span-2 lg:col-span-2 row-span-2 bg-black  rounded-xl  p-6">
              <AccordionComp fields={fields} />
            </div>

            <div className="bg-white rounded-xl  p-6 shadow-lg">
              <Map location={location} />
              <p className="text-gray-400 pt-4">{location.address}</p>
            </div>
            <div className="bg-white rounded-xl  p-6 shadow-lg">
              <PhoneShift location={location} />
            </div>

            <div className="sm:col-span-2 lg:col-span-2 row-span-1  rounded-xl text-white  p-6">
              <Carousel  location={location} />
            </div>

            <div className="bg-white rounded-xl  p-6 shadow-lg">
              <Amenities location={location} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import AddButton from "../../AddButton";
import SideBar from "../comps/SideBar";
import NavbarMobile from "../comps/NavBarMobile";
import LocationsCards from "../comps/LocationsCards";
import AddLocationStepper from "../comps/AddLocationStepper";
import { motion, AnimatePresence } from "framer-motion";

export default function BusinessAllLocations({
  user,
  locations,
  Favicon,
  RetoLogo,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isStepperOpen, setIsStepperOpen] = useState(false);


  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

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
        <div className="min-h-screen bg-gray-100 px-12 py-20">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-gray-800">Locations</h1>
            <AddButton onClick={() => setIsStepperOpen(true)} />
          </div>

          <p className="mb-8 text-gray-600">Check out your locations</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
            {locations?.map((location) => (
              <div
                key={location.id}
                className="block rounded-xl transition-shadow duration-200 "
              >
                <LocationsCards location={location} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isStepperOpen && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setIsStepperOpen(false)}
            />

            <motion.div
              initial={{ y: "100%", x: 0 }}
              animate={{ y: 0, x: 0 }}
              exit={{ y: "100%", x: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="fixed inset-0 z-[61] bg-white shadow-2xl
          w-screen h-[100dvh] overflow-y-auto"
            >
              <div className="flex justify-end p-3">
                <button
                  onClick={() => setIsStepperOpen(false)}
                  className="rounded-md px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 hover:cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="px-10 py-2">
                <AddLocationStepper onClose={() => setIsStepperOpen(false)} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

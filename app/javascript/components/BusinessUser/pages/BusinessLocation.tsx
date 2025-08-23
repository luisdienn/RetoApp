import React from "react";
import { useState, useEffect } from "react";
import SideBar from "../comps/SideBar";
import NavbarMobile from "../comps/NavBarMobile";
import AddFieldModal from "../comps/AddFieldModal";
import EditFieldModal from "../comps/EditFieldModal";

import { IoArrowBackCircleSharp } from "react-icons/io5";
import { GiSoccerField } from "react-icons/gi";
import { FaPlus, FaCircle } from "react-icons/fa";

export default function BusinessLocation({
  user,
  location,
  fields,
  Favicon,
  RetoLogo,
}: any) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentField, setCurrentField] = useState([]);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  console.log(fields)

  return (
    <>
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
          <div className="min-h-screen bg-gray-100 px-12 pt-12">
            <div className="flex items-center justify-between  pt-20">
              <div className="p-6 sm:p-8 bg-black shadow-lg rounded-lg w-5xl mx-auto">
                <div className="flex justify-between pt-8 pb-14">
                  <div
                    onClick={() => (window.location.href = "/business/all")}
                    className="cursor-pointer flex items-center hover:brightness-110 transition"
                  >
                    <IoArrowBackCircleSharp className="text-[#f9e7b8] text-4xl " />
                  </div>

                  {/* Name and Info */}
                  <div className=" text-center">
                    <h1 className="text-5xl font-semibold text-white">
                      {location.name}
                    </h1>
                    <p className="text-[#f9e7b8] mt-2">{location.address}</p>
                  </div>

                  <div className="order-3 flex  sm:flex-row items-center  md:justify-end space-y-4 sm:space-y-0 sm:space-x-4 mt-6 md:mt-0">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className=" hover:cursor-pointer rounded-full w-full sm:w-auto py-2 px-2 rounded bg-[#f9e7b8] text-black font-bold uppercase hover:brightness-110 transition shadow-md"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
                <div className="text-center sm:px-8 md:px-16 pb-8">
                  <h1 className="text-4xl font-bold text-white">Fields</h1>
                </div>
                <div
                  className={`grid grid-cols-1 sm:grid-cols-2 gap-8 px-6 pb-4 ${
                    fields.length >= 3
                      ? "lg:grid-cols-3"
                      : fields.length === 2
                      ? "lg:grid-cols-2"
                      : "lg:grid-cols-1"
                  }`}
                >
                  {fields.length == 0 ? (
                    <p className="text-gray-400 text-center pt-8">No fields available</p>
                  ) : (
                    fields.map((field: any) => (
                      <button
                        key={field.id} 
                        onClick={() => {
                          setCurrentField(field);
                          setEditModalOpen(true);
                        }}
                      >
                        <div className="border-2 border-[#f9e7b8] rounded-lg pb-4 text-white hover:bg-[#f9e7b8] hover:text-black hover:cursor-pointer transition">
                          <p className="text-center font-bold text-xl pt-4">
                            {field.name}
                          </p>
                          <div className="flex items-center justify-center">
                            <GiSoccerField className="w-32 h-32" />
                          </div>

                          <p className="flex items-center justify-center gap-2">
                            <span className="font-bold">Active:</span>
                            <FaCircle
                              size={10}
                              className={
                                field.active ? "text-green-500" : "text-red-500"
                              }
                            />
                          </p>

                          <p className="text-center">
                            <span className="font-bold">Size: </span>
                            {field.size}
                          </p>
                          <p className="text-center">
                            <span className="font-bold">Price: </span>$
                            {field.price}
                          </p>
                          <p className="text-center">
                            <span className="font-bold">Slots: </span>
                            {field.slot_length_mins} min
                          </p>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
          <AddFieldModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            location={location}
          />

          <EditFieldModal
            isOpen={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            location={location}
            field={currentField}
          />
        </div>
      </div>
    </>
  );
}

import React from "react";
import { useState } from "react";
import EditLocationStepper from "./EditLocationStepper";
import { motion, AnimatePresence } from "framer-motion";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { deleteRequest } from "../../../api";
import DeleteLocationModal from "./DeleteLocationModal";

export default function LocationsCards({ location }: any) {
  const [isStepperOpen, setIsStepperOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  function toHHMM(value?: string | null): string {
    if (!value) return "";
    // Works for "HH:MM", "HH:MM:SS", "YYYY-MM-DDTHH:MM:SS..."
    const m = String(value).match(/(\d{2}):(\d{2})/);
    return m ? `${m[1]}:${m[2]}` : "";
  }

  function formatPhoneIntl(raw?: string): string {
    if (!raw) return "";
    const input = raw.startsWith("+") ? raw : `+${raw}`;
    const phone = parsePhoneNumberFromString(input);
    return phone ? phone.formatInternational() : input;
  }

  function formatPhoneIntlDashed(raw?: string): string {
    const formatted = formatPhoneIntl(raw);
    const firstSpace = formatted.indexOf(" ");
    if (firstSpace === -1) return formatted;
    const prefix = formatted.slice(0, firstSpace);
    const national = formatted.slice(firstSpace + 1);
    return `${prefix} ${national.replace(/\s+/g, "-")}`;
  }



  return (
    <div className="max-w-full rounded overflow-hidden shadow-sm hover:shadow-lg bg-white">
      <a href={`/business/location/${location.id}`}>
        <div className="relative aspect-[16/9] w-full overflow-hidden  h-32">
          <img
            src={location.images[0]}
            alt={location.name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        </div>
      </a>

      <div className="px-6 py-4">
        <div className="flex justify-between">
          <a href={`/business/location/${location.id}`}>
            <div className="font-bold text-xl">{location.name}</div>
          </a>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsStepperOpen(true)}
              className="inline-flex items-center justify-center rounded-xl bg-[#ddc68b] px-4 py-2
               text-sm font-semibold text-black shadow-sm ring-1 ring-black/10
               transition hover:brightness-110 active:scale-[0.99] hover:cursor-pointer"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(true)}
              className="inline-flex items-center justify-center rounded-xl bg-[#ddc68b] px-4 py-2
               text-sm font-semibold text-black shadow-sm ring-1 ring-black/10
               transition hover:brightness-110 active:scale-[0.99] hover:cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
        <a href={`/business/location/${location.id}`}>
          <p className="text-gray-600 text-sm ">{location.address}</p>
          <p className="text-gray-600 text-sm">
            Phone: {formatPhoneIntlDashed(location.phone)}
          </p>{" "}
          <p className="text-gray-600 text-sm pb-4">
            Shifts: {toHHMM(location?.open_time)} -{" "}
            {toHHMM(location?.close_time)}
          </p>
          <p className="text-black ">{location.details}</p>
        </a>
      </div>

      <a href={`/business/location/${location.id}`}>
        <div className="px-6 pt-2 pb-2 gap-2">
          {location.tags?.map((tag) => (
            <span className="inline-block bg-gray-200 rounded-full px-4 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 ">
              {tag}
            </span>
          ))}
        </div>
      </a>

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
                <EditLocationStepper
                  onClose={() => setIsStepperOpen(false)}
                  location={location}
                />
              </div>


            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


                    <DeleteLocationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                location={location}
              />
    </div>
  );
}

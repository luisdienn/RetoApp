"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DeleteBookModal from "./DeleteBookModal";

export type Option = { label: string; value: string };

type Props = {
  isOpen: boolean;
  onClose: () => void;
  bookings: any;
};

export default function FilterModal({ isOpen, onClose, bookings }: Props) {
  const [selectBooking, setSelectBooking] = useState <number>();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


  const parsed = (Array.isArray(bookings) ? bookings : [])
    .map((b: any) => ({
      id: b?.[0],
      date: new Date(b?.[1]),
      location: b?.[2],
      field: b?.[3],
    }))
    .filter((x) => x.id != null && !isNaN(x.date?.getTime()));

  const now = new Date();

  const active = parsed
    .filter((x) => x.date > now)
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const previousLast3 = parsed
    .filter((x) => x.date <= now)
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 3);

  const fmtDay = (d: Date) =>
    d.toLocaleDateString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const fmtTime = (d: Date) =>
    d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });

  const handleDelete = async (book:number) => {
    setSelectBooking(book);
    setIsDeleteModalOpen(true);
  };

  return (
    <div>
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="fixed right-0 top-0 h-full w-full sm:max-w-md bg-white z-50 shadow-2xl rounded-l-2xl flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <div className="p-10 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Reservations</h2>
              <button
                onClick={onClose}
                className="rounded-md px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 hover:cursor-pointer"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="px-10 space-y-5 ">
              <p className="font-bold text-xl">Active</p>

              {active.length === 0 && (
                <div className="text-gray-500">No active reservations</div>
              )}

              {active.map((b) => (
                <div
                  key={`active-${b.id}`}
                  className="bg-black rounded p-4 grid grid-cols-2 "
                >
                  <div>
                    <p className="font-bold text-[#f9e7b8]">{b.location}</p>
                    <p className="text-white">Field: {b.field}</p>
                    <p className="text-white">Day: {fmtDay(b.date)}</p>
                    <p className="text-white">Time: {fmtTime(b.date)}</p>
                  </div>

                  <div className="flex justify-end ">
                    <button
                      onClick={() => {
                        handleDelete(b.id);
                      }}
                      className=" rounded p-2 font-bold text-sm border-2 text-white hover:border-red-500 hover:bg-red-500 hover:cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              <p className="font-bold text-xl">Previous</p>
              {previousLast3.length === 0 && (
                <div className="text-gray-400">No previous reservations</div>
              )}

              {previousLast3.map((b) => (
                <div
                  key={`prev-${b.id}`}
                  className="border-gray-200 border-4 rounded p-4"
                >
                  <p className="font-bold text-gray-500">{b.location}</p>
                  <p className="text-gray-500">Field: {b.field}</p>
                  <p className="text-gray-500">Day: {fmtDay(b.date)}</p>
                  <p className="text-gray-500">Time: {fmtTime(b.date)}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>

          <DeleteBookModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            book={selectBooking}
          />
        </div>
  );
}

"use client";

import React, { useMemo, useState, useEffect } from "react";
import Select from "react-select";
import { Country, City } from "country-state-city";
import { motion, AnimatePresence } from "framer-motion";

export type Option = { label: string; value: string };

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onApply: (values: { country: Option | null; city: Option | null }) => void;
  initialCountry: Option | null;
  initialCity: Option | null;
};

export default function FilterModal({
  isOpen,
  onClose,
  onApply,
  initialCountry,
  initialCity,
}: Props) {
  const countryOptions = useMemo<Option[]>(
    () =>
      Country.getAllCountries().map((c) => ({
        label: c.name,
        value: c.isoCode,
      })),
    []
  );

  const [country, setCountry] = useState<Option | null>(initialCountry);
  const [city, setCity] = useState<Option | null>(initialCity);

  useEffect(() => {
    if (isOpen) {
      setCountry(initialCountry);
      setCity(initialCity);
    }
  }, [isOpen]);

  const cityOptions = useMemo<Option[]>(() => {
    if (!country) return [];
    const raw = City.getCitiesOfCountry(country.value) || [];
    // unique by name
    const seen = new Set<string>();
    return raw
      .map((ci) => ({ label: ci.name, value: ci.name }))
      .filter((o) => {
        if (seen.has(o.value)) return false;
        seen.add(o.value);
        return true;
      })
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [country]);

  const clearAll = () => {
    setCountry(null);
    setCity(null);
  };

  const apply = () => onApply({ country, city });

  return (
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
              <h2 className="text-xl font-semibold">Filters</h2>
              <button
                onClick={onClose}
                className="rounded-md px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 hover:cursor-pointer"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="px-10 space-y-5 ">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Country (optional)
                </label>
                <Select
                  options={countryOptions}
                  value={country}
                  onChange={(opt) => {
                    setCountry(opt as Option | null);
                    setCity(null);
                  }}
                  isClearable
                  isSearchable
                  placeholder="Select a country…"
                  className=" focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  City (optional, choose country first)
                </label>
                <Select
                  options={cityOptions}
                  value={city}
                  onChange={(opt) => setCity(opt as Option | null)}
                  isDisabled={!country}
                  isClearable
                  placeholder={
                    country ? "Select a city…" : "Select a country first"
                  }
                />
              </div>
            </div>

            <div className="mt-auto p-6 border-t flex items-center justify-between">
              <button
                onClick={clearAll}
                className="text-sm text-gray-600 hover:underline hover:cursor-pointer"
              >
                Clear filters
              </button>
              <div className="space-x-3">
                <button
                  onClick={onClose}
                  className="rounded-xl px-4 py-2 border hover:cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={apply}
                  className="rounded-xl px-4 py-2 bg-gray-900 text-white hover:cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

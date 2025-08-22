"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import NavbarMobile from "../../NavBarMobile";
import SideBar from "../../SideBar";
import LocationsCards from "../comps/LocationsCards";
import FilterButton from "../comps/FilterButton";
import BookingsButton from "../comps/BookingsButton";
import SearchBar from "../comps/SearchBar";
import FilterModal, { Option } from "../comps/FilterModal";
import BookingModal from "../comps/BookingModal";

type LocationType = any;

export default function Locations({
  user,
  locations,
  bookings,
  Favicon,
  RetoLogo,
}: any) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);

  const [country, setCountry] = useState<Option | null>(null);
  const [city, setCity] = useState<Option | null>(null);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const getCountryCodeFromAddress = (loc: any) => {
    const addr = (loc?.address || "").toString().trim();
    const m = addr.match(/^([A-Za-z]{2})\b/);
    return m ? m[1].toUpperCase() : "";
  };

  const getCityFromAddress = (loc: any) => {
    const addr = (loc?.address || "").toString().trim();
    const afterComma = addr.split(",")[1];
    if (afterComma) return afterComma.trim();
    return addr.replace(/^[A-Za-z]{2}[\s-]*/, "").trim();
  };



  const baseFiltered = useMemo(() => {
    return locations.filter((loc: any) => {
      if (country) {
        const iso = getCountryCodeFromAddress(loc);
        if (iso !== country.value.toUpperCase()) return false;
      }

      if (city) {
        const c = getCityFromAddress(loc).toLowerCase();
        const addr = (loc?.address || "").toString().toLowerCase();
        const target = city.value.toLowerCase();
        if (!(c === target || addr.includes(target))) return false;
      }

      return true;
    });
  }, [locations, country, city]);

  const searchFiltered =
    searchTerm.length >= 2
      ? baseFiltered.filter((u: LocationType) =>
          (u.name || "")
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      : baseFiltered;

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
            <div className="flex gap-6">
              <BookingsButton onClick={() => setIsBookOpen(true)} />

              <FilterButton onClick={() => setIsFilterOpen(true)} />
            </div>
          </div>

          <p className="mb-8 text-gray-600">Check out your locations</p>

          {(country || city) && (
            <div className="mb-4 flex flex-wrap gap-2 text-sm">
              {country && (
                <span className="px-2 py-1 bg-white border rounded-full">
                  Country: {country.label}
                </span>
              )}
              {city && (
                <span className="px-2 py-1 bg-white border rounded-full">
                  City: {city.label}
                </span>
              )}
              <button
                onClick={() => {
                  setCountry(null);
                  setCity(null);
                }}
                className="text-gray-600 hover:underline"
              >
                Clear
              </button>
            </div>
          )}

          <div className="mt-6 mb-4 pb-5 relative" ref={searchContainerRef}>
            <SearchBar
              value={searchTerm}
              placeholder="Search for a field..."
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowResults(true);
              }}
              onSearchClick={() => setShowResults(true)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-6">
              {searchFiltered.map((location: LocationType) => (
                <div
                  key={location.id}
                  className="block rounded-xl transition-shadow duration-200"
                >
                  <LocationsCards location={location} />
                </div>
              ))}

              {searchFiltered.length === 0 && (
                <div className="col-span-full text-center text-gray-500">
                  No locations found.
                </div>
              )}
            </div>
          </div>

          <FilterModal
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            initialCountry={country}
            initialCity={city}
            onApply={({ country: ctry, city: cty }) => {
              setCountry(ctry);
              setCity(cty);
              setIsFilterOpen(false);
            }}
          />

          <BookingModal
            isOpen={isBookOpen}
            onClose={() => setIsBookOpen(false)}
            bookings={bookings}
          />
        </div>
      </div>
    </div>
  );
}

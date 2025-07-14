import React, { useState, useRef, useEffect } from "react";
import AddButton from "../AddButton";
import SideBar from "../SideBar";
import SearchBar from "./SearchBar";
import StatsTable from "./StatsTable";

export default function Friendships({ user,usermatches,userwc, allusers,friends_matches,friends_wc, friends,Favicon, RetoLogo }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  const filteredUsers =
    searchTerm.length >= 2
      ? allusers.filter((u) =>
          u.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  // Detect click outside
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex overflow-hidden h-screen">
      <SideBar
        user={user}
        Favicon={Favicon}
        RetoLogo={RetoLogo}
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex-1 overflow-y-auto">
        <div className="min-h-screen bg-gray-100 p-12">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-gray-800">Friends</h1>
          </div>
          <p className="text-gray-600">Time to check where are you standing</p>

          <div className="mt-6 mb-4 pb-5 relative" ref={searchContainerRef}>
            <SearchBar
              value={searchTerm}
              placeholder="Search friends..."
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowResults(true);
              }}
              onSearchClick={() => setShowResults(true)}
            />

            {showResults && searchTerm.length >= 2 && (
              <div className="absolute top-full w-full bg-white shadow-lg rounded z-50 max-h-60 overflow-y-auto">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((friend) => (
                    <a
                      href={
                        user.id === friend.id
                          ? "/profile"
                          : `/friendships/profile/${friend.id}`
                      }
                    >
                      <div
                        key={friend.id}
                        className="hover:cursor-pointer px-4 py-2 hover:bg-gray-100 flex items-center justify-between"
                      >
                        <div>
                          <p className="font-semibold">{friend.name}</p>
                          <p className="text-sm text-gray-500">
                            {friend.email}
                          </p>
                        </div>
                      </div>
                    </a>
                  ))
                ) : (
                  <p className="text-gray-500 italic px-4 py-2">
                    No results found.
                  </p>
                )}
              </div>
            )}
          </div>

          <StatsTable user={user} friends={friends} usermatches={usermatches} userwc={userwc}  friends_matches={friends_matches} friends_wc={friends_wc} />
        </div>
      </div>
    </div>
  );
}

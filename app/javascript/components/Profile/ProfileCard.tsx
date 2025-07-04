import React from "react";

export default function ProfileCard() {
  return (
    <div className="p-6 sm:p-8 bg-black shadow-lg rounded-lg max-w-5xl mx-auto">

      {/* Top section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Profile Picture */}
        <div className="order-1 md:order-2 flex justify-center md:justify-center">
          <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border-4 border-[#f9e7b8] shadow-lg -mt-20 md:mt-0 flex items-center justify-center bg-[#111]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 sm:h-24 sm:w-24 text-[#f9e7b8]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Stats */}
        <div className="order-2 md:order-1 grid grid-cols-3 text-[#f9e7b8] items-center mt-8 md:mt-0">
          <div>
            <p className="text-xl font-bold sm:text-2xl">22</p>
            <p className="text-sm sm:text-base">Friends</p>
          </div>
          <div>
            <p className="text-xl font-bold sm:text-2xl">10</p>
            <p className="text-sm sm:text-base">Photos</p>
          </div>
          <div>
            <p className="text-xl font-bold sm:text-2xl">89</p>
            <p className="text-sm sm:text-base">Comments</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="order-3 flex flex-col sm:flex-row items-center justify-center md:justify-end space-y-4 sm:space-y-0 sm:space-x-4 mt-6 md:mt-0">
          <button className="w-full sm:w-auto py-2 px-6 rounded bg-[#f9e7b8] text-black font-bold uppercase hover:brightness-110 transition shadow-md">
            Connect
          </button>
          <button className="w-full sm:w-auto py-2 px-6 rounded border border-[#f9e7b8] text-[#f9e7b8] uppercase hover:bg-[#f9e7b8] hover:text-black transition shadow-md">
            Message
          </button>
        </div>
      </div>

      {/* Name and Info */}
      <div className="mt-16 text-center border-b border-gray-700 pb-8 px-4">
        <h1 className="text-3xl sm:text-4xl font-semibold text-white">Jessica Jones</h1>
        <p className="text-[#f9e7b8] mt-2">Bucharest, Romania</p>
        <p className="mt-4 text-gray-400">Solution Manager - Creative Tim Officer</p>
        <p className="text-gray-400">University of Computer Science</p>
      </div>

      {/* Description */}
      <div className="mt-10 text-center px-4 sm:px-8 md:px-16">
        <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
          An artist of considerable range, Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy —
          writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure.
        </p>
        <button className="mt-4 text-[#f9e7b8] font-medium hover:underline">
          Show more
        </button>
      </div>
    </div>
  );
}

import React, { useState } from "react";

type WorldCupProps = {
  badges: any;
};

export default function WorldCups({ badges }: WorldCupProps) {
  const wc_badges = badges.filter((badge) =>
    badge.name.condition_type("world_cups")
  );

  return (
    <>
      <div className="pt-10 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-gray-800">World Cups</h1>
      </div>

      <div className="flex flex-wrap justify-center">
        {wc_badges.map((badge) => {
          const [isOpen, setIsOpen] = useState(false);

          return (
            <div 
              key={badge.id}
              className="relative pt-20"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <img
                src={`http://localhost:3000/${badge.image_url}`}
                alt="badge"
                className="w-32 h-32 object-contain cursor-pointer"
              />

              {isOpen && (
                <div className="absolute z-10 w-32 bg-white rounded-lg shadow-lg left-1/2 -translate-x-1/2 top-6 p-2">
                  <h3 className="font-bold text-gray-800">{badge.name}</h3>
                  <p className="text-sm text-gray-600">{badge.description}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

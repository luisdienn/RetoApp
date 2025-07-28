import React, { useState } from "react";

type GoalsProps = {
  badges: any;
};

export default function Goals({ badges }: GoalsProps) {
  const goals_badges = badges.filter((badge) =>
    badge.name.includes("Goals")
  );

  return (
    <>
      <div className="pt-10 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-gray-800">Goals</h1>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {goals_badges.map((badge) => {
          const [isOpen, setIsOpen] = useState(false);

          return (
            <div
              key={badge.id}
              className="relative pt-10"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <img
                src={`http://localhost:3000/${badge.image_url}`}
                alt="badge"
                className="w-42 h-42 object-contain cursor-pointer"
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

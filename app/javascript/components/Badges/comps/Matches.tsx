import React, { useState } from "react";

type MatchesProps = {
  badges: any;
};

export default function Matches({ badges }: MatchesProps) {
  const matches_badges = badges.filter((badge) =>
    badge.condition_type.includes("matches")
  );

  return (
    <>
      <div className="pt-10 ">
        <div
          className={`flex flex-col bg-white border border-gray-200 shadow-md rounded-xl pb-8 `}
        >
          <div className="bg-gray-100 border-b border-gray-200 rounded-t-xl py-3 px-4 md:py-4 md:px-5 dark:bg-neutral-900 dark:border-neutral-700">
            <p className="text-2xl font-bold text-white">Matches</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {matches_badges.map((badge) => {
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
                    className="w-18 h-18 object-contain cursor-pointer"
                  />

                  {isOpen && (
                    <div className="absolute z-10 w-32 bg-white rounded-lg shadow-lg left-1/2 -translate-x-1/2 top-6 p-2">
                      <h3 className="font-bold text-gray-800">{badge.name}</h3>
                      <p className="text-sm text-gray-600">
                        {badge.description}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useState } from "react";

type PlayerStats = {
  id: number;
  profileImage?: string;
  name?: string;
  matches: number;
  goals: number;
  worldCups: number;
  assists: number;
};

// Ejemplo de datos de varios jugadores

const buttons = [
  { label: "Matches", key: "matches" },
  { label: "Goals", key: "goals" },
  { label: "World Cups", key: "worldCups" },
  { label: "Assists", key: "assists" },
];

export default function StatsTable({
  user,
  friends,
  usermatches,
  userwc,
  friends_matches,
  friends_wc,
}) {
  const [selectedStat, setSelectedStat] =
    useState<keyof PlayerStats>("matches");

  const players: PlayerStats[] = [
    {
      id: user.id,
      profileImage: user.image,
      name: user.name,
      matches: usermatches.filter((match) => match.user_id === user.id).length,
      goals: usermatches
        .filter((match) => match.user_id === user.id)
        .reduce((sum, match) => sum + match.goals, 0),
      worldCups: userwc,
      assists: usermatches
        .filter((match) => match.user_id === user.id)
        .reduce((sum, match) => sum + match.assists, 0),
    },
    ...friends.map((friend) => ({
      id: friend.id,
      profileImage: friend.image,
      name: friend.name,
      matches: friends_matches.filter((match) => match.user_id === friend.id)
        .length,
      goals: friends_matches
        .filter((match) => match.user_id === friend.id)
        .reduce((sum, match) => sum + match.goals, 0),
      worldCups: friends_wc.filter(
        (wc) => wc.user_id === friend.id && wc.was_won
      ).length,
      assists: friends_matches
        .filter((match) => match.user_id === friend.id)
        .reduce((sum, match) => sum + match.assists, 0),
    })),
  ];

  return (
    <div className="bg-[#ffff] p-6 rounded-xl shadow-md max-w-4xl mx-auto w-full">
      {/* Buttons */}
      <div className="flex justify-around mb-4 flex-wrap gap-2">
        {buttons.map((btn) => (
          <button
            key={btn.key}
            onClick={() => setSelectedStat(btn.key as keyof PlayerStats)}
            className={`px-4 py-2 hover:cursor-pointer rounded-full transition-colors duration-300 font-semibold ${
              selectedStat === btn.key
                ? "bg-black text-[#f9e7b8]"
                : "bg-gray-400 text-white hover:bg-[#333]"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="">
        <table className="min-w-full bg-white rounded-lg">
          <thead>
            <tr>
              <th className="text-left py-3 px-4 font-semibold">Rank</th>
              <th className="text-left py-3 px-4 font-semibold">Profile</th>
              <th className="text-left py-3 px-4 font-semibold">Player</th>
              <th className="text-right py-3 px-4 font-semibold w-32">
                {selectedStat.charAt(0).toUpperCase() + selectedStat.slice(1)}
              </th>
            </tr>
          </thead>
          <tbody>
            {players
              .sort(
                (a, b) =>
                  (b[selectedStat] as number) - (a[selectedStat] as number)
              )
              .map((player, index) => (
                <tr
                  key={player.id}
                  className={player.id === user.id ? "bg-gray-100" : ""}
                >
                  {/* Columna de Rank */}
                  <td className="py-3 px-4 font-bold">{index + 1}</td>

                  {/* Columna de la foto con corona si es primer lugar */}
                  <td className="py-3 px-4">
                    <div className="relative flex items-center justify-center w-12 h-12 ">
                      {index === 0 && (
                        <img
                          src="https://icons.veryicon.com/png/o/business/bss-business-support-system/an-crown-26.png"
                          alt="Crown"
                          className="w-5 h-5 absolute -top-3"
                        />
                      )}
                      {player.profileImage ? (
                        <img
                          src={player.profileImage}
                          alt={player.name}
                          className="w-10 h-10 rounded-full "
                        />
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-20 w-20 sm:h-24 sm:w-24 text-[#ddc68b]"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </td>

                  {/* Columna del nombre */}

                  <td className="py-3 px-4 font-medium">
                    {player.id === user.id ? (
                      <a
                        href={`/profile`}
                        className="hover:cursor-pointer flex flex-col "
                      >
                        {" "}
                        {player.name}
                      </a>
                    ) : (
                      <a
                        href={`/friendships/profile/${player.id}`}
                        className="hover:cursor-pointer flex flex-col "
                      >
                        {player.name}
                      </a>
                    )}
                  </td>

                  {/* Columna del número */}
                  <td className="text-right py-3 px-4 font-bold w-32">
                    {player[selectedStat]}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

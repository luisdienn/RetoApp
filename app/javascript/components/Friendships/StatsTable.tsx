import React, { useState } from "react";

type PlayerStats = {
  id: number;
  profileImage: string;
  name: string;
  matches: number;
  goals: number;
  worldCups: number;
  assists: number;
};

// Ejemplo de datos de varios jugadores
const players: PlayerStats[] = [
  {
    id: 1,
    profileImage: "https://via.placeholder.com/60",
    name: "Diogo",
    matches: 230,
    goals: 330,
    worldCups: 2,
    assists: 85,
  },
  {
    id: 2,
    profileImage: "https://via.placeholder.com/60",
    name: "Lucas",
    matches: 210,
    goals: 295,
    worldCups: 1,
    assists: 102,
  },
  {
    id: 3,
    profileImage: "https://via.placeholder.com/60",
    name: "Sara",
    matches: 250,
    goals: 310,
    worldCups: 3,
    assists: 76,
  },
];

const buttons = [
  { label: "Matches", key: "matches" },
  { label: "Goals", key: "goals" },
  { label: "World Cups", key: "worldCups" },
  { label: "Assists", key: "assists" },
];

export default function RankingTable() {
  const [selectedStat, setSelectedStat] =
    useState<keyof PlayerStats>("matches");

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
      <div className="overflow-x-auto">
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
                <tr key={player.id} className="border-t">
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
                      <img
                        src={player.profileImage}
                        alt={player.name}
                        className="w-10 h-10 rounded-full border border-[#f9e7b8]"
                      />
                    </div>
                  </td>

                  {/* Columna del nombre */}
                  <td className="py-3 px-4 font-medium">{player.name}</td>

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

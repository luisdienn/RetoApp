import React from "react";

export default function RecentGame() {
  return (
    <>
      <h2 className="text-2xl font-bold text-white mb-6">Recent Game</h2>
      <div className="flex flex-col gap-1">
        <span className="text-gray-400">Date: 2023-10-01</span>
        <span className="text-gray-400">Opponent: Team B</span>
        <span className="text-gray-400">Score: 3 - 1</span>
        <span className="text-green-500 font-bold">Result: Win</span>
      </div>
    </>
  );
}

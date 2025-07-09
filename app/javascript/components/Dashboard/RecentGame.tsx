import React from "react";

export default function RecentGame({ lastmatch }: any) {
  // Determinar color según resultado
  const resultColor =
    lastmatch.result === "Win"
      ? "text-green-500"
      : lastmatch.result === "Loss"
      ? "text-red-500"
      : lastmatch.result === "Draw"
      ? "text-orange-500"
      : "text-gray-400"; // color por defecto si no coincide

  return (
    <>
      <h2 className="text-2xl font-bold text-white mb-6">Recent Game</h2>
      <div className="flex flex-col gap-1">
        <span className="text-gray-400">Date: {lastmatch.date}</span>

        {lastmatch.opponent && (
          <span className="text-gray-400">Opponent: {lastmatch.opponent}</span>
        )}
                {lastmatch.details && (
          <span className="text-gray-400">Description: {lastmatch.details}</span>
        )}

        <span className="text-gray-400">Score: {lastmatch.score}</span>
        <span className={`${resultColor} font-bold`}>
          Result: {lastmatch.result}
        </span>
      </div>
    </>
  );
}

import React from 'react';

export default function WCGames() {
  const games = [
    { date: "2022-11-21", score: "2 - 1", result: "Win" },
    { date: "2022-11-25", score: "1 - 1", result: "Draw" },
    { date: "2022-11-29", score: "0 - 2", result: "Loss" },
  ];

  return (
    <>
      <h2 className="text-2xl font-bold text-white mb-6">World Cup Games:</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr>
              <th className="px-2 py-1 text-[#f9e7b8]">Date</th>
              <th className="px-2 py-1 text-[#f9e7b8]">Score</th>
              <th className="px-2 py-1 text-[#f9e7b8]">Result</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game, idx) => (
              <tr key={idx} className="border-b border-gray-700 last:border-0">
                <td className="px-2 py-1 text-white">{game.date}</td>
                <td className="px-2 py-1 text-white">{game.score}</td>
                <td className={`px-2 py-1 font-semibold ${
                  game.result === "Win"
                    ? "text-green-400"
                    : game.result === "Draw"
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}>
                  {game.result}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
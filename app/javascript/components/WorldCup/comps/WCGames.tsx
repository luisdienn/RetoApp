import React from 'react';

export default function WCGames({matches}:any) {


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
            {matches.map((match, idx) => (
              <tr key={idx} className="border-b border-gray-700 last:border-0">
                <td className="px-2 py-1 text-white">{match.date}</td>
                <td className="px-2 py-1 text-white">{match.score}</td>
                <td className={`px-2 py-1 font-semibold ${
                  match.result === "Win"
                    ? "text-green-400"
                    : match.result === "Draw"
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}>
                  {match.result}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
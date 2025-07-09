import React, { useState } from "react";
import { postRequest } from "../api";

type AddMatchModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddMatchModal({ isOpen, onClose }: AddMatchModalProps) {
  const [goals, setGoals] = useState("");
  const [result, setResult] = useState("");
  const [score1, setScore1] = useState(""); // Primer número del score
  const [score2, setScore2] = useState(""); // Segundo número del score
  const [details, setDetails] = useState("");
  const [date, setDate] = useState("");
  const [assists, setAssists] = useState("");
  const [passes, setPasses] = useState("");
  const [fouls, setFouls] = useState("");
  const [blocks, setBlocks] = useState("");
  const [opponent, setOpponent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Concatenar los dos números del score
    const score = `${score1}-${score2}`;

    const resultt = await postRequest("/matches", {
      match: {
        goals,
        assists,
        passes,
        fouls,
        blocks,
        opponent,
        result,
        score,
        details,
        date,
      },
    });

    if (resultt.success && resultt.redirect_url) {
      window.location.href = resultt.redirect_url;
    }
  };

  if (!isOpen) return null;

  // Hoy en local timezone
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // Mes empieza en 0
  const dd = String(today.getDate()).padStart(2, "0");
  const todayStr = `${yyyy}-${mm}-${dd}`;

  // Ayer en local timezone
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yyyyY = yesterdayDate.getFullYear();
  const mmY = String(yesterdayDate.getMonth() + 1).padStart(2, "0");
  const ddY = String(yesterdayDate.getDate()).padStart(2, "0");
  const yesterdayStr = `${yyyyY}-${mmY}-${ddY}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div
        className="relative bg-white p-6 z-10 rounded-lg shadow-lg w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4">Add Match</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Goals</label>
              <input
                type="number"
                name="goals"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Assists</label>
              <input
                type="number"
                name="assists"
                value={assists}
                onChange={(e) => setAssists(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Passes</label>
              <input
                type="number"
                name="passes"
                value={passes}
                onChange={(e) => setPasses(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Fouls</label>
              <input
                type="number"
                name="fouls"
                value={fouls}
                onChange={(e) => setFouls(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Blocks</label>
              <input
                type="number"
                name="blocks"
                value={blocks}
                onChange={(e) => setBlocks(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Opponent</label>
            <input
              type="text"
              name="opponent"
              value={opponent}
              onChange={(e) => setOpponent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Result</label>
            <select
              name="result"
              value={result}
              onChange={(e) => setResult(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select Result</option>
              <option value="Win">Win</option>
              <option value="Loss">Loss</option>
              <option value="Draw">Draw</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Score</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={score1}
                onChange={(e) => setScore1(e.target.value)}
                className="w-1/2 p-2 border border-gray-300 rounded"
              />
              <span className="font-bold pt-2">-</span>
              <input
                type="number"
                value={score2}
                onChange={(e) => setScore2(e.target.value)}
                className="w-1/2 p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Details</label>
            <textarea
              name="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              rows={3}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
              min={yesterdayStr}
              max={todayStr}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Match
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

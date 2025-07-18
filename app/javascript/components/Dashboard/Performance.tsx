import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import React, { useState } from "react";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

type Stat = {
  matchesyear: number;
  goalsyear: number;
  foulsyear: number;
  assistsyear: number;
  blockyear: number;
  passesyear: number;
};

export default function Performance({
  matchesyear,
  goalsyear,
  foulsyear,
  assistsyear,
  blockyear,
  passesyear,
}: Stat) {
  const allStats = [
    { label: "Matches", value: matchesyear ?? 0 },
    { label: "Goals", value: goalsyear ?? 0 },
    { label: "Assists", value: assistsyear ?? 0 },
    { label: "Passes", value: passesyear ?? 0 },
    { label: "Fouls", value: foulsyear ?? 0 },
    { label: "Blocks", value: blockyear ?? 0 },
  ];

  const [selectedStats, setSelectedStats] = useState(
    allStats.map((stat) => ({ ...stat, selected: true }))
  );

  const handleCheckboxChange = (label: string) => {
    setSelectedStats((prevStats) =>
      prevStats.map((stat) =>
        stat.label === label ? { ...stat, selected: !stat.selected } : stat
      )
    );
  };

  const filteredStats = selectedStats.filter((stat) => stat.selected);
  const labels = filteredStats.map((stat) => stat.label);
  const dataValues = filteredStats.map((stat) => stat.value);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Player Stats",
        data: dataValues,
        backgroundColor: "#b48a5a",
        borderColor: "#b48a5a",
        pointBackgroundColor: "#000000",
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          color: "#444",
        },
        grid: {
          color: "#444",
        },
        pointLabels: {
          color: "#f9e7b8",
          font: {
            size: 12,
          },
        },
        ticks: {
          display: false,
          stepSize: 20,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="text-white flex">
      {/* Stats */}
      <div className="flex flex-col pr-10 ">
        <h2 className="text-2xl font-bold text-white">Performance</h2>
        <p className="text-[#f9e7b8]">{new Date().getFullYear()}</p>
        {/* Compact stats */}
        <div className="pl-5 pt-12 grid grid-cols-3 gap-y-8 gap-x-16">
          {allStats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-3xl font-bold">{stat.value}</span>
              <span className="text-sm text-[#f9e7b8]">{stat.label}</span>
              <input
                type="checkbox"
                checked={
                  selectedStats.find((s) => s.label === stat.label)?.selected
                }
                onChange={() => handleCheckboxChange(stat.label)}
                className="mt-2 accent-[#b48a5a] rounded border border-[#b48a5a] hover:bg-[#f9e7b8] hover:cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Radar chart */}
      <div className="flex mx-auto items-center justify-center">
        <Radar data={data} options={options} />
      </div>
    </div>
  );
}

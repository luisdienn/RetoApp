// src/components/Performance.tsx
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  layouts,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function Performance() {
  const data = {
    labels: ["Matches", "Goals", "Fouls", "Assists", "Blocks", " Passes"],
    datasets: [
      {
        label: "Player Stats",
        data: [50, 60, 3, 0, 10, 98],
        backgroundColor: "#b48a5a",
        borderColor: "#b48a5a",
        pointBackgroundColor: "b48a5a",
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

  const stats = [
    { label: "Matches", value: 6 },
    { label: "Goals", value: 2 },
    { label: "Fouls", value: 6 },
    { label: "Assists", value: 2 },
    { label: "Blocks", value: 6 },
    { label: "Passes", value: 2 },
  ];

  return (
    <div className="text-white flex ">
      {/* Stats */}
      <div className="flex flex-col pr-10">
        <h2 className="text-2xl font-bold text-white">Performance</h2>
        <p className="text-gold-side">2025</p>
        {/* Compact stats */}
        <div className="pt-14 grid grid-cols-3 gap-y-8 gap-x-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-4xl font-bold">{stat.value}</span>
              <span className="text-sm text-gold-side">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Radar chart */}
      {/* Radar chart */}
      <div className="flex mx-auto items-center justify-center">
        <Radar data={data} options={options} />
      </div>
    </div>
  );
}

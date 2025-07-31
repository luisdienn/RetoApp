import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminChart({ allusers }: any) {
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlyUserCounts = Array(12).fill(0);

  if (allusers && Array.isArray(allusers)) {
    allusers.forEach((user: any) => {
      const createdAt = new Date(user.created_at);
      const month = createdAt.getMonth();
      monthlyUserCounts[month]++;
    });
  }

  const data = {
    labels,
    datasets: [
      {
        label: "New Users per Month",
        data: monthlyUserCounts,
        backgroundColor: "#b48a5a",
        borderColor: "#b48a5a",
        pointBackgroundColor: "#000000",
        pointBorderColor: "#b48a5a",
        pointHoverBackgroundColor: "#f9e7b8",
        tension: 0.2,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#f9e7b8",
        },
        grid: {
          color: "#444",
        },
      },
      y: {
        ticks: {
          color: "#f9e7b8",
        },
        grid: {
          color: "#444",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-white">App Performance</h2>
      <div className="pt-6 lg:min-h-[500px] sm:min-h-[300px]">
        <Line data={data} options={options} />
      </div>
    </>
  );
}

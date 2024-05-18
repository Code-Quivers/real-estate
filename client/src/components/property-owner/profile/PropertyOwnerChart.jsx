"use client";
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement } from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PropertyOwnerChart = ({ expected, collected, label1, label2, costColor }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        max: expected + collected,
        ticks: {
          display: true,
        },
      },
      x: {
        ticks: {
          display: false,
        },
      },
    },

    elements: {
      point: {
        radius: 0,
      },
    },
  };

  const labels = [""];

  const data = {
    labels,
    datasets: [
      {
        label: label1,
        data: [expected],
        backgroundColor: costColor || "rgba(53, 162, 235, 0.5)",
      },
      {
        label: label2,
        data: [collected],
        backgroundColor: "#2941a0",
      },
    ],
  };

  return (
    <div className="border rounded-2xl p-5 bg-white">
      <Bar options={options} data={data} />
    </div>
  );
};

export default PropertyOwnerChart;

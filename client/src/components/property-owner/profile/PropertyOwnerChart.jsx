import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

const PropertyOwnerChart = () => {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          display: false,
        },
      },
    },
    scales: {
      y: {
        max: 500,
        grid: {
          color: "#000",
          drawBorder: false,
          drawTicks: false,
          drawOnChartArea: false,
        },
        ticks: {
          display: false,
        },
      },
      x: {
        grid: {
          color: "#ff0000",
          drawBorder: false,
          drawTicks: false,
          drawOnChartArea: false,
        },
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

  const labels = ["Expected Rent", "Rent Collected"];

  const data = {
    labels,
    datasets: [
      {
        label: "Expected Rent",
        data: [0, 350],
        borderColor: "#000",
        backgroundColor: "#000",
      },
      {
        label: "Rent Collected",
        data: [0, 200],
        borderColor: "#29429f",
        backgroundColor: "#29429f",
      },
    ],
  };

  return ( 
    <div className="border rounded-2xl p-5 bg-white">
      <Line options={options} data={data} />
    </div>
  );
};

export default PropertyOwnerChart;

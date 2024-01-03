import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { Bar, Pie } from "react-chartjs-2";
import Sidebar from "../components/Sidebar";

Chart.defaults.font.size = 16;
Chart.defaults.font.family = "'SF Pro Display', sans-serif";
Chart.defaults.layout.padding = 5;

function ChartListPage() {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchChartData = async () => {
    setIsLoading(true);
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("Do not have userId");
      }
      const response = await axios.get(
        `http://localhost:3000/chartList/${userId}`
      );
      setChartData(response.data.collection[0].values);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  const chartConfig = useMemo(() => {
    const labels = chartData.map((item) => item.category);
    const data = chartData.map((item) => item.value);

    console.log("labels", labels);
    console.log("data", data);

    return {
      data: {
        labels,
        datasets: [
          {
            label: "Chart API",
            data,
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 206, 86)",
              "rgb(75, 192, 192)",
              "rgb(153, 102, 255)",
              "rgb(255, 159, 64)",
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 206, 86)",
              "rgb(75, 192, 192)",
            ],
          },
        ],
      },
      options: {
        aspectRatio: 1,
        type: "bar",
        responsive: true,
        maintainAspectRatio: false,
        transitions: {
          show: {
            animations: {
              x: { from: 0 },
              y: { from: 0 },
            },
          },
          hide: {
            animations: {
              x: { to: 0 },
              y: { to: 0 },
            },
          },
        },
        scales: {
          x: {
            ticks: {
              autoSkip: false,
            },
          },
          y: {
            ticks: {
              beginAtZero: true,
              stepSize: 50,
              max: 1000,
            },
          },
        },
      },
      plugins: {},
    };
  }, [chartData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex">
      <div className="#">
        <Sidebar />
      </div>

      <div className="basis-full flex-col space-y-10 pt-28 pr-10">
        <div className="bg-white rounded-md shadow-md w-full h-52">
          <Bar data={chartConfig.data} options={chartConfig.options} />
          </div>

          <div className="bg-white rounded-md shadow-md w-full h-52">
            <Bar data={chartConfig.data} options={chartConfig.options} />
          </div>

          <div className="bg-white rounded-md shadow-md w-full h-52">
            <Bar data={chartConfig.data} options={chartConfig.options} />
          </div>
      </div>
    </div>
  );
}

export default ChartListPage;

import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
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
      // console.log("response", response);

      const allChartData = response.data.collection.map((item) => item.values);
      setChartData(allChartData);

      console.log(allChartData);
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
    return chartData.map((data, index) => {
      const labels = data.map((item) => item.category);
      const values = data.map((item) => item.value);

      return {
        data: {
          labels,
          datasets: [
            {
              label: `Collection ${index + 1}`,
              data: values,
              backgroundColor: [
                "rgb(239, 71, 111)",
                "rgb(255, 209, 102)",
                "rgb(6, 214, 160)",
                "rgb(17, 138, 178)",
                "rgb(7, 59, 76)",
                "rgb(255, 99, 146)",
                "rgb(255, 228, 94)",
                "rgb(127, 200, 248)",
                "rgb(90, 169, 230)",
                "rgb(251, 133, 0)"
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
    });
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
        {chartConfig.map((config, index) => (
          <div
            key={index}
            className="bg-white rounded-md shadow-md w-full h-52"
          >
            <Bar data={config.data} options={config.options} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChartListPage;

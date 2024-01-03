import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import Sidebar from "../components/Sidebar";

Chart.defaults.font.size = 16;
Chart.defaults.font.family = "'SF Pro Display', sans-serif";
Chart.defaults.layout.padding = 20;
Chart.defaults.color = "#fff";

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

      // Create a canvas element to apply the gradient
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Create the gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, 200);
      gradient.addColorStop(0, "#DD3061"); //top
      gradient.addColorStop(0.25, "#E55986"); // 1st middle
      gradient.addColorStop(0.5, "#D75587"); // 2nd  middle
      gradient.addColorStop(0.75, "#CC5188"); // 3rd middle
      gradient.addColorStop(1, "#AD4689"); //bottom;

      return {
        data: {
          labels,
          datasets: [
            {
              label: `Dataset ${index + 1}`,
              data: values,
              backgroundColor: gradient,
            },
          ],
        },
        options: {
          aspectRatio: 1,
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
              grid: {
                display: false,
              },
              ticks: {
                color: "#fff",
                autoSkip: false,
              },
              title: {
                display: true,
                text: `Collection ${index + 1}`,
                color: "#fff",
                font: {
                  size: 20,
                  weight: "bold",
                  lineHeight: 1.2,
                },
                padding: { top: 20, left: 0, right: 0, bottom: 0 },
              },
            },
            y: {
              grid: {
                color: "#9FA0A1",
                drawBorder: false,
              },
              ticks: {
                color: "#fff",
                beginAtZero: false,
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
    <div className="grid grid-cols-[160px,1fr]">
      <div className="fixed top-0 left-0 h-screen w-160 z-50">
        <Sidebar />
      </div>

      <div className="col-start-2 space-y-10 pt-28 pr-10">
        {chartConfig.map((config, index) => (
          <div
            key={index}
            className="backdrop-blur-3xl rounded-md shadow-md w-full h-96"
          >
            <Bar data={config.data} options={config.options} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChartListPage;

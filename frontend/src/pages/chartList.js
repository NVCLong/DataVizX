import Sidebar from "../components/Sidebar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { chartList } from "../api/api";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";

ChartJS.defaults.font.size = 16;
ChartJS.defaults.font.family = "'SF Pro Display', sans-serif";
ChartJS.defaults.layout.padding = 10;

function ChartList() {
  const [chartData, setChartData] = useState([]); // State to store fetched data
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const [error, setError] = useState(null); // State to track errors


  // Test zone/////////////////////////////////////////
  const data1 = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange", "Black", "White", "Grey", "Brown", "Pink", "Cyan"],
    datasets: [
      {
        label: "Color Chart",
        data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(0, 0, 0, 0.2)",
          "rgba(255, 255, 255, 0.2)",
          "rgba(128, 128, 128, 0.2)",
          "rgba(165, 42, 42, 0.2)",
          "rgba(255, 192, 203, 0.2)",
          "rgba(0, 255, 255, 0.2)"],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
}


const config = {
  type: 'line',
  data: data1,
  options: {
    transitions: {
      show: {
        animations: {
          x: {
            from: 0
          },
          y: {
            from: 0
          }
        }
      },
      hide: {
        animations: {
          x: {
            to: 0
          },
          y: {
            to: 0
          }
        }
      }
    }
  }
};


// Test zone/////////////////////////////////////////

useEffect(() => {
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
      setChartData(response.data);
    } catch (error) {
      setError(error);
      console.error(error); // Keep for debugging
    } finally {
      setIsLoading(false);
    }
  };

  fetchChartData();
}, []);

if (chartData && !isLoading) {
  // Render the chart components using chartData
  console.log(chartData); // Example usage
}
return (
  <div className="flex ">
    <div className="">
      <Sidebar />
    </div>
    <div className="basis-full flex-col space-y-10 pt-28 pr-10">
      <div className="bg-white rounded-md shadow-md w-full h-52">
        <Line data={data1} options={config}

        />
      </div>
      <div className="bg-white rounded-md shadow-md w-full h-52"></div>
      <div className="bg-white rounded-md shadow-md w-full h-52"></div>
    </div>
  </div>
);
}

export default ChartList;

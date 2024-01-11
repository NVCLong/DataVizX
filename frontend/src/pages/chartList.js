import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import Sidebar from "../components/Sidebar";
import { Button } from "../Comp_homepage/Button";
import "../Comp_homepage/Button.css";
import {useNavigate} from "react-router-dom";

Chart.defaults.font.size = 16;
Chart.defaults.font.family = "'SF Pro Display', sans-serif";
Chart.defaults.layout.padding = 20;
Chart.defaults.color = "#fff";

function ChartListPage() {
  const [chartData, setChartData] = useState([]);
  const [chartName, setChartName] = useState([]);
  const [chartID, setChartID] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async (chartId) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("Do not have userId");
      }

      if (!chartId) {
        throw new Error("Do not have chartId");
      }
      const response = await axios.delete(
        `http://localhost:3000/chartList/${userId}/${chartId}`
      );
      console.log("response", response);
      // alert("Chart has been deleted");
      // window.location.reload();
      // navigate("/chartList");
    } catch (error) {
      alert(error.message);
    }
  }

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
      console.log("response", response);

      // console.log(response.data.collection.map((item) => item._id));
      const allChartID = response.data.chartlist.DataList.map(
        (item) => item._id
      );
      setChartID(allChartID);

      // console.log(response.data.collection[1].name);

      const allChartData = response.data.collection.map((item) => item.values);
      setChartData(allChartData);

      // console.log(allChartData)

      const allChartName = response.data.collection.map((item) => item.name);
      setChartName(allChartName);
      // console.log(allChartName);

      // console.log(allChartData);
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
      gradient.addColorStop(0, "RGBA(188,1,189,1)"); //top
      // gradient.addColorStop(0.25, "#E55986"); // 1st middle
      gradient.addColorStop(0.5, "RGBA(182,1,184,0.6)"); // 2nd  middle
      // gradient.addColorStop(0.75, "#CC5188"); // 3rd middle
      gradient.addColorStop(1, "RGBA(250,206,251,0.5"); //bottom;

      return {
        data: {
          labels,
          datasets: [
            {
              label: `Dataset ${index + 1}`,
              data: values,
              fill: true,
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
                text: chartName[index],
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
  }, [chartData, chartName]);

  if (isLoading) {
    return (
      <div>
        <div className="flex">
          <div className="#">
            <Sidebar />
          </div>
          <div className="pt-96 pr-10 mx-auto">
            <button
              type="button"
              class="flex justify-center items-center py-2.5 px-5 me-2 mb-2 text-3xl font-bold w-72 h-16 focus:outline-none rounded-lg border  focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700 transition duration-300 transform hover:scale-110"
            >
              + Add new chart
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex">
        <div className="#">
          <Sidebar />
        </div>

        <div className="pt-96 pr-10 mx-auto ">
          <div className="flex justify-center items-center py-2.5 px-5 me-2 mb-2 text-xl font-semibold w-auto h-auto focus:outline-none rounded-lg border  focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700 transition duration-300 transform hover:scale-110">
            <h1>Error: {error.message}</h1>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[160px,1fr]">
      <div className="fixed top-0 left-0 h-screen w-160 z-50">
        <Sidebar />
      </div>
      <div className="btn-chartList">
          <Button
            className="btns"
            buttonSize="btn--medium"
            buttonStyle="btn--outline"
            linkUrl={"/createChart"}
          >
            + Add new Chart
          </Button>
        </div>
      <div className="col-start-2 space-y-20 pt-28 pr-10">
        {chartConfig.map((config, index) => (
          <div
            key={index}
            className="inline-table backdrop-blur-3xl rounded-md shadow-md w-11/12 h-96"
          >
            <Line data={config.data} options={config.options} />

            <div className="">
              <div class="absolute right-5 bottom-5 inline-flex rounded-md shadow-sm">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium  border rounded-s-lg focus:z-10 focus:ring-2 bg-purple-600 border-purple-800 text-white hover:text-white hover:bg-purple-400 focus:ring-blue-500 focus:text-white transition duration-300 transform hover:scale-110"
                  onClick={() => {
                    localStorage.setItem("chartId", chartID[index]);
                    navigate("/chartDetail");
                  }}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium  border rounded-e-lg focus:z-10 focus:ring-2 bg-purple-600 border-purple-800 text-white hover:text-white hover:bg-purple-400 focus:ring-blue-500 focus:text-white transition duration-300 transform hover:scale-110"

                  onClick={async () => {
                    try {
                      await axios.delete(`http://localhost:3000/collection/delete/${chartID[index]}`)
                      navigate("/chartList");
                    } catch (e) {
                      setError(e)
                    }

                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChartListPage;

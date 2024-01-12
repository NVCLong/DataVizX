import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { jwtDecode } from 'jwt-decode';

Chart.defaults.font.size = 16;
Chart.defaults.font.family = "'SF Pro Display', sans-serif";
Chart.defaults.layout.padding = 20;
Chart.defaults.color = "#fff";

function ChartListPage() {
  const [searchData, setSearchData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartName, setChartName] = useState([]);
  const [chartID, setChartID] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sort, setSort] = useState(false);
  const [error, setError] = useState(null);
  const [activeSearch, setActiveSearch] = useState([]);
  const navigate = useNavigate();

  const handleSortUp = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("Do not have userId");
      }
      const response = await axios.get(
        `http://localhost:3000/chartList/asc/${userId}`
      );
      // console.log(response.data);

      const allChartID = response.data.collectionAsc.map((item) => item._id);
      setChartID(allChartID);
      const allChartData = response.data.collectionAsc.map(
        (item) => item.values
      );
      setChartData(allChartData);
      const allChartName = response.data.collectionAsc.map((item) => item.name);
      setChartName(allChartName);
    } catch (error) {
      setError(error);
    }
  };
  const handleSortDown = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("Do not have userId");
      }
      const response = await axios.get(
        `http://localhost:3000/chartList/desc/${userId}`
      );
      // console.log(response.data);

      const allChartID = response.data.collectionDesc.map((item) => item._id);
      setChartID(allChartID);
      const allChartData = response.data.collectionDesc.map(
        (item) => item.values
      );
      setChartData(allChartData);
      const allChartName = response.data.collectionDesc.map((item) => item.name);
      setChartName(allChartName);
    } catch (error) {
      setError(error);
    }
  };

  const handleSearch = async (e) => {
    setSearchData({ searchString: e.target.value });
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.post(
        `http://localhost:3000/chartList/search/${userId}`,
        searchData
      );
      // console.log(response.data.searchResult);
      setActiveSearch(response.data.searchResult);
      // console.log(activeSearch);
    } catch (error) {
      setError(error);
    }
  };

  const fetchChartData = async () => {
    setIsLoading(true);
    try {
      localStorage.removeItem("chartId");
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("Do not have userId");
      }
      // verify
      let accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const decoded = jwtDecode(accessToken);
      const refreshDecoded = jwtDecode(refreshToken);
      const refreshExpireTime = refreshDecoded.exp * 1000;
      const expirationTime = decoded.exp * 1000; // Convert to milliseconds
      const currentTime = Date.now();
      if (currentTime > expirationTime) {
        if (currentTime < refreshExpireTime) {
          await axios.post("http://localhost:3000/verify/refresh", { refreshToken: refreshToken, userId: userId })
            .then(response => {
              //  console.log(response.data)
              localStorage.setItem('accessToken', response.data.newAccessToken)
            }).catch(error => {
              //  console.log(error)
            })
        } else {
          localStorage.clear()
          navigate("/login")
        }
      }
      if (!accessToken) {
        // console.log("access token expried")
        localStorage.clear()
        navigate("/login")
      } else {
        accessToken = localStorage.getItem("accessToken")
        const verify = await axios.post("http://localhost:3000/verify", { access_token: accessToken })
        if (verify.data.status === "false") {
          localStorage.clear()
          navigate("/login")
        }
      }
      //verify

      const response = await axios.get(
        `http://localhost:3000/chartList/${userId}`
      );

      const allChartID = response.data.chartlist.DataList.map(
        (item) => item._id
      );
      setChartID(allChartID);

      const allChartData = response.data.collection.map((item) => item.values);
      setChartData(allChartData);

      const allChartName = response.data.collection.map((item) => item.name);
      setChartName(allChartName);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchChartData();
    // eslint-disable-next-line
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

      gradient.addColorStop(0.5, "RGBA(182,1,184,0.6)"); // 2nd  middle

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

      <Loading isLoadingPage={isLoading}
        delayTime={500000}
      >
        <div>
          <div className="flex">
            <div className="#">
              <Sidebar />
            </div>
            <div className="pr-10 mx-auto pt-96">
              <button
                type="button"
                onClick={() => navigate("/createChart")}
                class="flex justify-center items-center py-2.5 px-5 me-2 mb-2 text-3xl font-bold w-72 h-16 focus:outline-none rounded-lg border  focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700 transition duration-300 transform hover:scale-110"
              >
                + Add new chart
              </button>
            </div>
          </div>
        </div>{" "}
      </Loading>
    );
  }

  if (error) {
    return (
      <div className="">
        <div className="flex">
          <div className="#">
            <Sidebar />
          </div>
          <div className="pr-10 mx-auto pt-96">
            <button
              type="button"
              onClick={() => navigate("/createChart")}
              class="flex justify-center items-center py-2.5 px-5 me-2 mb-2 text-3xl font-bold w-72 h-16 focus:outline-none rounded-lg border  focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700 transition duration-300 transform hover:scale-110"
            >
              + Add new chart
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[160px,1fr]">
      <div className="fixed top-0 left-0 z-50 h-screen w-160">
        <Sidebar />
      </div>

      <div className="" id="header">
        <div
          className="fixed z-50 p-4 transition duration-300 transform -translate-x-1/2 top-2 left-1/2 drop-shadow-xl "
          id="SearchBar"
        >
          <form>
            <label
              htmlFor="default-search"
              className="mb-2 font-semibold text-gray-900 sr-only dark:text-white "
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3 ">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className=" w-96 p-3.5 ps-5 text-lg border text-gray-400 transition duration-300 transform bg-slate-800 border-gray-600 rounded-lg focus:outline-none focus:z-10 focus:ring-4 focus:ring-gray-700 hover:text-white hover:bg-gray-900 hover:scale-11 active:bg-gray-700 drop-shadow-xl  hover:ring-purple-500 hover:ring-2"
                placeholder="Search chart..."
                required
                name="searchString"
                onChange={(e) => handleSearch(e)}
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-3 py-2 bg-purple-500 hover:bg-purple-600 focus:ring-purple-800 drop-shadow-xl hover:scale-105 transition duration-300"
                onClick={handleSearchSubmit}
              >
                Search
              </button>
            </div>
            {activeSearch.length > 0 && (
              <div className="absolute flex flex-col w-full gap-2 space-y-0 text-gray-400 transition duration-300 transform -translate-x-1/2 border-gray-600 top-20 rounded-xl left-1/2 hover:text-white drop-shadow-xl">
                {activeSearch.map((s) => (
                  <div
                    className="w-full gap-2 p-4 text-gray-400 transition duration-300 transform border-gray-600 cursor-pointer drop-shadow-xl bg-slate-800 top-20 rounded-xl left-1/2 hover:text-white hover:bg-gray-700 hover:scale-110 "
                    onClick={() => {
                      localStorage.setItem("chartId", s._id);
                      navigate("/chartDetail");
                    }}
                  >
                    {s.name}
                  </div>
                ))}
              </div>
            )}
          </form>
        </div>

        <div className="fixed z-10 p-4 top-3.5 left-36 space-x-5 drop-shadow-xl " id="SortingButton">
          <button
            type="button"
            onClick={() => {
              handleSortUp()

            }}
            className="w-20 px-0 py-0 mb-0 text-xl font-bold text-gray-400 transition duration-300 transform bg-gray-800 border border-gray-600 rounded-lg me-0 h-11 focus:outline-none focus:z-10 focus:ring-4 focus:ring-gray-700 hover:text-white hover:bg-gray-700 hover:scale-110 hover:ring-purple-500 hover:ring-2"
          >
            Sort ↑
          </button>
          <button
            type="button"
            onClick={() => {
              handleSortDown()

            }}
            className="w-20 px-0 py-0 mb-0 text-xl font-bold text-gray-400 transition duration-300 transform bg-gray-800 border border-gray-600 rounded-lg me-0 h-11 focus:outline-none focus:z-10 focus:ring-4 focus:ring-gray-700 hover:text-white hover:bg-gray-700 hover:scale-110 hover:ring-purple-500 hover:ring-2"
          >
            Sort ↓
          </button>

        </div>

        <div className="fixed z-50 p-4 top-3.5 right-11 drop-shadow-xl" id="AddChartButton">
          <button
            type="button"
            onClick={() => navigate("/createChart")}
            className="px-0 py-0 mb-0 text-xl font-bold text-gray-400 transition duration-300 transform bg-gray-800 border border-gray-600 rounded-lg me-0 w-44 h-11 focus:outline-none focus:z-10 focus:ring-4 focus:ring-gray-700 hover:text-white hover:bg-gray-700 hover:scale-110 hover:ring-purple-500 hover:ring-2"
          >
            + Add new chart
          </button>
        </div>
      </div>

      <div className="col-start-2 pr-10 space-y-20 pt-28">
        {chartConfig.map((config, index) => (
          <div
            key={index}
            className="w-full rounded-md shadow-md inline-table backdrop-blur-3xl h-96"
          >
            <Line data={config.data} options={config.options} />

            <div className="">
              <div className="absolute inline-flex space-x-5 rounded-md shadow-sm right-5 bottom-5">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-white transition duration-300 transform bg-purple-600 rounded-s-lg focus:z-10 focus:ring-2 hover:text-white hover:bg-purple-400 focus:ring-purple-400 focus:text-white hover:scale-110 drop-shadow-xl hover:ring-purple-500 hover:ring-2"
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.setItem("chartId", chartID[index]);
                    navigate("/chartDetail");
                  }}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-white transition duration-300 transform bg-purple-600 rounded-e-lg focus:z-10 focus:ring-2 hover:text-white hover:bg-purple-400 focus:text-white hover:scale-110 drop-shadow-xl hover:ring-purple-500 hover:ring-2"
                  onClick={async () => {
                    try {
                      const userId = localStorage.getItem("userId");
                      if (!userId) {
                        alert("User not found");
                      }
                      await axios.delete(
                        `http://localhost:3000/collection/delete/${userId}/${chartID[index]}`
                      );
                      window.location.reload(true);
                    } catch (e) {
                      setError(e);
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

import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import DataVizX from "../images/DataVizX.png";
import axios from "axios";
import ImageUpload from "../components/ImageUpload";
import ImageDelete from "../components/ImageDelete";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const User = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("Do not have userId");
      }
      const response = await axios.get(`http://localhost:3000/user/${userId}`);
      setUserData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e) => {
    const accessToken= localStorage.getItem("accessToken");
      const decoded = jwtDecode(accessToken);
      const expirationTime = decoded.exp * 1000; // Convert to milliseconds
      const currentTime = Date.now();
      if (currentTime > expirationTime) {
      localStorage.clear()
      navigate("/login")
    }
      if(!accessToken){
        localStorage.clear()
        navigate("/login")
      }
      const verify= await axios.post("http://localhost:3000/verify",{access_token: accessToken})
      if(verify.data.status==="false"){
        localStorage.clear()
        navigate("/login")
      }
  }
  useEffect(() => {
    handleVerify()
    fetchUserData()
  }, []);

  if (isLoading) {
    return <div className="text-sm font-medium text-white">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex">
        <div className="#">
          <Sidebar />
        </div>
        <div className="pr-10 mx-auto pt-96">
          <div className="flex justify-center items-center py-2.5 px-5 me-2 mb-2 text-xl font-semibold w-auto h-auto focus:outline-none rounded-lg border  focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700">
            <h1>Error: {error.message}</h1>
          </div>
        </div>
      </div>
    );
  }

  if (!userData) {
    return <div className="text-sm font-medium text-white">No User Data</div>;
  }

  return (
    <div className="flex">
      <div className="#">
        <Sidebar />
      </div>

      <div className="pt-40 pr-10 mx-auto" id="mainClass">
        <div className="mx-auto">
          <div>
            <div className="relative pb-3 mx-auto bg-white rounded-lg shadow w-80">
              <div className="flex justify-center pb-10">
                <img
                  src={userData.imageUrl ? userData.imageUrl : DataVizX}
                  alt="logoMain"
                  className="absolute object-cover w-56 h-56 mx-auto transition duration-300 transform border-4 border-white rounded-full shadow-2xl -top-20 hover:scale-110"
                />
              </div>

              <div>
                <div className="flex justify-center pb-0 pt-36">
                  <button
                    onClick={toggleDropdown}
                    className={`cursor-pointer px-3.5 py-1.5 text-base border-none rounded focus:z-10 focus:ring-2 ${
                      showDropdown
                        ? "px-0 py-0 text-base border rounded focus:z-10 focus:ring-2 bg-white border-purple-900 text-purple-500"
                        : "bg-purple-500 border-purple-900 text-white hover:text-white hover:bg-purple-600 focus:text-white"
                    } transition duration-300 transform hover:scale-110 ease-in-out`}
                  >
                    Edit{" "}
                    <svg
                      className="inline w-2 h-2 ms-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                    {showDropdown && (
                      <div className="z-10 items-center justify-center w-48 ">
                        <div className="space-y-0">
                          <ImageUpload />
                          <ImageDelete />
                        </div>
                      </div>
                    )}{" "}
                  </button>
                </div>
              </div>

              <div className="pt-0 mt-16">
                <h1 className="text-4xl font-bold text-center text-gray-900">
                  {userData ? userData.userName : "DataVizX"}
                </h1>
                <p className="text-sm font-medium text-center text-gray-400">
                  DataVizX Premium User
                </p>
                <div className="px-6 my-5">
                  <a
                    href="/chartList"
                    className="block px-6 py-3 font-semibold leading-6 text-center transition duration-300 transform bg-purple-600 rounded-full text-gray-50 hover:bg-purple hover:text-white hover:scale-110"
                  >
                    View chart of{" "}
                    <span className="font-bold">@{userData.userName}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;

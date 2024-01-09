import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import DataVizX from "../images/DataVizX.png";
import axios from "axios";

const User = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("Do not have userId");
      }
      console.log(userId);
      const response = await axios.get(`http://localhost:3000/user/${userId}`);
      setUserData(response.data);

      const userImage = response.data.imageUrl;
      console.log(userImage);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // console.log(userData);
  if (isLoading) {
    return <div className="text-sm font-medium text-white">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex">
        <div className="#">
          <Sidebar />
        </div>

        <div className="pt-96 pr-10 mx-auto">
          <div className="flex justify-center items-center py-2.5 px-5 me-2 mb-2 text-xl font-semibold w-auto h-auto focus:outline-none rounded-lg border  focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700">
            <h1>Error: {error.message}</h1>
            </div>;
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
            <div className="bg-white relative shadow rounded-lg mx-auto pb-3 w-auto">
              <div className="flex justify-center">
                <img
                  src={userData.imageUrl ? userData.imageUrl : DataVizX}
                  alt="logoMain"
                  className="object-cover rounded-full mx-auto absolute -top-20  w-56 h-56 shadow-md border-4 border-white transition duration-300 transform hover:scale-110"
                />
              </div>

              <div className="mt-16 pt-24">
                <h1 className="font-bold text-center text-4xl text-gray-900">
                  {userData ? userData.userName : "DataVizX"}
                </h1>
                <p className="text-center text-sm text-gray-400 font-medium">
                  DataVizX Premimum User
                </p>
                <div className="my-5 px-6">
                  <a
                    href="/chartList"
                    className="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white transition duration-300 transform hover:scale-110"
                  >
                    View chart of <span className="font-bold">@DataVizX</span>
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

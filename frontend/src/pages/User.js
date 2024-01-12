import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import blank_profile from "../images/blank_profile.png";
import axios from "axios";
import ImageUpload from "../components/ImageUpload";
import ImageDelete from "../components/ImageDelete";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Loading from "../components/Loading";

const User = () => {
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const fetchUserData = async () => {

    try {
      setIsLoadingPage(true);
      // console.log('setTrue')
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("Do not have userId");
      }
      const response = await axios.get(`http://localhost:3000/user/${userId}`);
      setUserData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoadingPage(false);
      // console.log('setFalse')
    }
  };


  const handleVerify = async (e) => {
    const userId = localStorage.getItem("userId");
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
  }
  useEffect(() => {
    handleVerify()
    fetchUserData();
  }, [])

  if (isLoadingPage) {
    return (
      <Loading isLoadingPage={isLoadingPage} delayTime={3000}>
      </Loading>
    );
  }

  if (error) {
    return (
      <div className="flex">
        <div className="#">
          <Sidebar />
        </div>
        <div className="pr-10 mx-auto pt-96">
          <div className="flex justify-center items-center py-2.5 px-5 me-2 mb-2 text-3xl font-bold w-72 h-16 focus:outline-none rounded-lg border  focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700 transition duration-300 transform hover:scale-110">
            <h1 className="">Error: {error.message}</h1>
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

      {/* <Loading isLoadingPage={isLoadingPage} delayTime={300}> */}
      <div className="pt-40 pr-10 mx-auto" id="mainClass">
        <div className="mx-auto">
          <div>
            <div className="relative pb-3 mx-auto bg-white rounded-lg shadow w-80">
              <div className="flex justify-center pb-24">
                <img
                  src={userData.imageUrl ? userData.imageUrl : blank_profile}
                  alt="logoMain"
                  className="absolute object-scale-down w-56 h-56 mx-auto transition duration-300 transform border-4 border-white rounded-full shadow-2xl -top-20 hover:scale-110"
                />
              </div>

              <div>
                <div className="flex-row justify-center pt-12 space-y-3">
                  <ImageUpload />
                  <ImageDelete />
                </div>
              </div>

              <div className="pt-0 mt-3">
                <h1 className="text-4xl font-bold text-center text-gray-900">
                  {userData ? userData.userName : "DataVizX"}
                </h1>
                <p className="text-sm font-medium text-center text-gray-400">
                  DataVizX Premium User
                </p>
                <div className="px-6 my-5">
                  <a
                    href="/chartListPage"
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
      {/* </Loading> */}
    </div>
  );
};

export default User;

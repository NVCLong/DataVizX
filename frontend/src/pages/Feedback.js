import Sidebar from "../components/Sidebar";
import TextareaAutosize from "react-textarea-autosize";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Feedback = () => {
  const [post, setPost] = useState({
    username: "",
    content: "",
  });
  const [error, setError] = useState(null);
  const API = "https://datavizx.onrender.com";
  const navigate = useNavigate();

  const handleInput = function (event) {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/report/sendReport`, { post });
      alert("Feedback sent successfully!");
      navigate("/ChartListPage");
    } catch (error) {
      alert("Feedback failed to send!");
      setError(error);
    }
  };

  const handleVerify = async (e) => {
    const userId = localStorage.getItem("userId");
    let accessToken= localStorage.getItem("accessToken");
    const refreshToken= localStorage.getItem("refreshToken");
    const decoded = jwtDecode(accessToken);
    const refreshDecoded= jwtDecode(refreshToken);
    const refreshExpireTime = refreshDecoded.exp*1000;
    const expirationTime = decoded.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();
    if (currentTime > expirationTime) {
      if(currentTime < refreshExpireTime){
         await axios.post(`${API}/verify/refresh`,{refreshToken:refreshToken, userId: userId})
             .then(response =>{
              //  console.log(response.data)
               localStorage.setItem('accessToken', response.data.newAccessToken)
             }).catch(error =>{
              //  console.log(error)
             })
      } else {
        localStorage.clear()
        navigate("/login")
      }
    }
    if(!accessToken){
      // console.log("access token expried")
      localStorage.clear()
      navigate("/login")
    }else {
      accessToken = localStorage.getItem("accessToken")
      const verify = await axios.post(`${API}/verify`, {access_token: accessToken})
      if (verify.data.status === "false") {
        localStorage.clear()
        navigate("/login")
      }
    }
  }
  useEffect(() => {
    handleVerify()
  },[])

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex">
      <div className="#">
        <Sidebar />
      </div>

      <div className="pt-12 pr-10 mx-auto" id="mainClass">
        <h1 className="text-4xl font-bold text-center text-white uppercase pb-11">
          Feedback
        </h1>
        <div id="inputClass" className="space-y-8">
          <div id="userInput" className="">
            <label className="flex justify-center mb-2 text-lg font-medium tracking-wider text-white">
              Username
            </label>
            <div className="flex justify-center">
              <input
                type="text"
                className="w-48 px-4 py-3 text-base text-gray-400 transition duration-300 transform border-gray-700 rounded-lg shadow-lg ps-6 bg-slate-900 ring-gray-600 hover:scale-110"
                placeholder="Enter your username"
                name="username"
                onChange={handleInput}
              />
            </div>
          </div>

          <div id="textInput">
            <label
              form="feedback"
              className="flex justify-center mb-2 text-lg font-medium tracking-wider text-white"
            >
              Feedback
            </label>
            <TextareaAutosize
              id="feedback"
              minRows="8"
              className="flex p-2.5 w-96 shadow-lg rounded-lg text-base bg-slate-900 border-gray-700 text-gray-400 ring-gray-600 transition duration-300 transform hover:scale-110"
              placeholder="Write your feedback here..."
              name="content"
              onChange={handleInput}
            />
          </div>

          <div id="buttonInput" className="flex items-center justify-center">
            <button
              type="button"
              className="px-4 py-2 text-base font-medium tracking-wider text-white transition duration-300 transform border-purple-800 rounded-lg focus:z-10 focus:ring-2 dark:bg-purple-600 hover:text-white hover:bg-purple-800 focus:ring-purple-500 focus:text-white hover:scale-110 "
              onClick={handleSubmit}
            >
              Submit feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;


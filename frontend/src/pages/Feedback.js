import Sidebar from "../components/Sidebar";
import TextareaAutosize from "react-textarea-autosize";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const [post, setPost] = useState({
    username: "",
    content: "",
  });
  const [error, setError] = useState(null);
  const API = "http://localhost:3000";
  const navigate = useNavigate();

  const handleInput = function (event) {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/report/sendReport`, { post });
      alert("Feedback sent successfully!");
      navigate("/chartList");
    } catch (error) {
      alert("Feedback failed to send!");
      setError(error);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex">
      <div className="#">
        <Sidebar />
      </div>

      <div className="pt-12 pr-10 mx-auto" id="mainClass">
        <h1 className="text-4xl font-bold text-center pb-11 text-white uppercase">
          Feedback
        </h1>
        <div id="inputClass" className="space-y-8">
          <div id="userInput" className="">
            <label className="flex justify-center text-lg font-medium mb-2 text-white tracking-wider">
              Username
            </label>
            <div className="flex justify-center">
              <input
                type="text"
                className="py-3 px-4 ps-6 w-48 shadow-lg rounded-lg text-base bg-slate-900 border-gray-700 text-gray-400 ring-gray-600 transition duration-300 transform hover:scale-110"
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

          <div id="buttonInput" className="flex justify-center items-center">
            <button
              type="button"
              className="px-4 py-2 text-base font-medium rounded-lg focus:z-10 focus:ring-2  dark:bg-purple-600 border-purple-800 text-white hover:text-white hover:bg-purple-800 focus:ring-purple-500 focus:text-white tracking-wider transition duration-300 transform hover:scale-110
              "
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


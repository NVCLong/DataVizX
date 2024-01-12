import React from "react";

const AnswerSec = ({ messages }) => {
  // console.log(messages);
  return (
    <div className="flex flex-col items-center m-8">
      <div className="flex items-center m-5">
        <div className="#">
          <h1 className="flex flex-col items-center text-2xl font-bold text-white">Answer</h1>
          {messages.map((message, index) => (
            <p
              key={index}
              className="flex w-auto h-auto p-6 mt-2 text-gray-400 transition duration-300 transform border-gray-700 shadow-lg rounded-3xl bg-slate-900 ring-gray-600 hover:scale-110"
            >
              {message}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnswerSec;

import React from "react";

const AnswerSec = ({ messages }) => {
  console.log(messages);
  return (
    <div className="flex flex-col items-center m-8">
      <div className="flex items-center m-5">
        <div className="#">
          <h1 className="flex flex-col items-center text-2xl font-bold text-white">Answer</h1>
          {messages.map((message, index) => (
            <p
              key={index}
              className="flex p-6 mt-2 rounded-3xl w-auto h-auto bg-slate-900 border-gray-700 text-gray-400 ring-gray-600 shadow-lg transition duration-300 transform hover:scale-110"
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

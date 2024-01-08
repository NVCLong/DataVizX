import React from "react";

const AnswerSec = ({ messages }) => {
  return (
    <div className="flex flex-col items-center m-8">
      <div className="flex flex-col items-center m-5">
        <hr className="w-10" />
        <div className="w-10">
          {messages.map((value, index) => {
            return (
              <div className="#" key={index}>
                <p className="p-6 mt-2 bg-indigo-600 font-bold">{value.input}</p>
                <p className="p-10 bg-gray-800">{value.answer}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnswerSec;

import React from "react";

const ChatHeader = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col items-center w-6/12">
        <h1 className="text-4xl text-white font-bold ">ChatDVX</h1>
        <br />
        <p className="text-center text-white">
        Hi! I'm DVX-AI, powered by ChatGPT to provide you with information and assistance across a variety of topics. Feel free to ask me any questions, seek explanations, or request help. I'll do my best to provide accurate and helpful responses, but please remember to verify and cross-reference for important or sensitive matters to ensure information is complete and correct.
        </p>
      </div>
      <br />
    </div>
  );
};

export default ChatHeader;

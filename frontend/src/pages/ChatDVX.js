import Sidebar from "../components/Sidebar";
import ChatForm from "../components/ChatForm";
import ChatHeader from "../components/ChatHeader";
import AnswerSec from "../components/Answer";
import { useState } from "react";


const ChatDVX = () => {
  const [messages, setMessages] = useState([]);

  const responseGenerate = async (inputText, setInputText, response) => {
    if (response && response.response && response.response.content) {
      setMessages((messages) => [...messages, response.response.content]);
    }
  };


  return (
    <div className="flex">
      <div className="flex flex-row">
        <Sidebar />
      </div>
      <div className="h-screen p-12">
        <ChatHeader />
        <ChatForm responseGenerate={responseGenerate} />
        <AnswerSec messages={messages} />
      </div>
    </div>
  );
};

export default ChatDVX;

import Sidebar from "../components/Sidebar";
import ChatForm from "../components/ChatForm";
import ChatHeader from "../components/ChatHeader";
import AnswerSec from "../components/Answer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const ChatDVX = () => {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const responseGenerate = async (inputText, setInputText, response) => {
    if (response && response.response && response.response.content) {
      setMessages((messages) => [...messages, response.response.content]);
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
  },[])


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

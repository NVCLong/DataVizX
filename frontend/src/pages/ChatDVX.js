import Sidebar from "../components/Sidebar";
import ChatForm from "../components/ChatForm";
import ChatHeader from "../components/ChatHeader";
import AnswerSec from "../components/Answer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const ChatDVX = () => {
  const API = 'https://datavizx.onrender.com';
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const responseGenerate = async (inputText, setInputText, response) => {
    if (response && response.response && response.response.content) {
      setMessages((messages) => [...messages, response.response.content]);
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


  return (
    <div className="flex">
      <div className="flex flex-row">
        <Sidebar />
      </div>
      <div className="h-screen p-12">
        <ChatHeader />
        <AnswerSec messages={messages} />
        <ChatForm responseGenerate={responseGenerate} />
      </div>
    </div>
  );
};

export default ChatDVX;

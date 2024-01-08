import Sidebar from "../components/Sidebar";
import ChatForm from "../components/ChatForm";
import ChatHeader from "../components/ChatHeader";
import AnswerSec from "../components/Answer";
import openai from "openai";
import { useState } from "react";

openai.apiKey = "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";

const ChatDVX = () => {
  const [messages, setMessages] = useState([]);

  const responseGenerate = async (inputText, setInputText) => {
    let options = {
      prompt: `Complete this sentence: "${inputText}"`,
      model: "text-davinci-003",
      max_tokens: 50,
      n: 1,
      stop: ".",
    };

    let completeOptions = {
      ...options,
      prompt: inputText,
    };

    const response = await openai.Completion.create(completeOptions);

    if (response.data.choices) {
      setMessages([
        {
          question: inputText,
          answer: response.data.choices[0].text,
        },
        ...messages,
      ]);
      setInputText("");
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

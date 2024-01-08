import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

const ChatForm = ({ responseGenerate }) => {
  const [inputText, setInputText] = useState("");

  return (
    <div className="flex flex-col mt-2 items-center justify-center focus:rounded-tl-none focus:rounded-bl-none focus:rounded-tr-none">
      <TextareaAutosize
        rows="10"
        minRows="4"
        className="flex-grow rounded p-2.5 w-96 bg-slate-900 border-gray-700 text-gray-400 ring-gray-600 shadow-lg transition duration-300 transform hover:scale-110"
        placeholder="Ask me anything..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></TextareaAutosize>
      <br />
      <button
        onClick={() => responseGenerate(inputText, setInputText)}
        className="ml-2 w-44 h-8 bg-purple-700 text-white rounded cursor-pointer mt-2 hover:bg-purple-500 shadow-lg transition duration-300 transform hover:scale-110"
      >
        Generate response
      </button>
    </div>
  );
};

export default ChatForm;

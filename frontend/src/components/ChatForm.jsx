import { useState } from "react";

const ChatForm = ({ responseGenerate }) => {
  const [inputText, setInputText] = useState("");

  return (
    <div className="flex flex-col mt-2 items-center justify-center focus:rounded-tl-none focus:rounded-bl-none focus:rounded-tr-none">
      <textarea
        rows="10"
        className="flex-grow rounded"
        placeholder="Ask me anything..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></textarea>
      <br />
      <button
        onClick={() => responseGenerate(inputText, setInputText)}
        className="ml-2 bg-blue-600 text-white rounded cursor-pointer mt-2 hover:rounded-tl-none hover:rounded-bl-none hover:rounded-tr-none"
      >
        Generate Response
      </button>
    </div>
  );
};

export default ChatForm;

import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";


const ChatForm = ({ responseGenerate }) => {
  const API='http://localhost:3000'
  const [inputText, setInputText] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleInput= (e)=>{
    setInputText({ [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    setIsLoading(true);
    try {
      // console.log(inputText)
      const response = await axios.post(`${API}/support/post`, {inputText});
      // console.log(response)

      responseGenerate(inputText, setInputText, response.data );
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }


  if (error) {
    return (
      <div className="text-sm font-medium text-white">
        An error has occurred: {error.message}
      </div>
    );
  }


  return (
    <div className="flex flex-col items-center justify-center mt-2 focus:rounded-tl-none focus:rounded-bl-none focus:rounded-tr-none">
      <TextareaAutosize
        rows="10"
        minRows="1"
        className="flex-grow rounded-full p-2.5 w-96 bg-slate-900 border-gray-700 text-gray-400 ring-gray-600 shadow-lg transition duration-300 transform hover:scale-110"
        placeholder="Ask me anything..."
        name='question'
        onChange={handleInput}
      ></TextareaAutosize>
      <br />
      <button
        onClick={handleSubmit}
        className="h-8 mt-2 ml-2 text-white transition duration-300 transform bg-purple-700 rounded shadow-lg cursor-pointer w-44 hover:bg-purple-500 hover:scale-110"
      >
        Generate response
      </button>
    </div>
  );
};

export default ChatForm;

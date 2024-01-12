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
    <div className="fixed inset-x-0 flex w-6/12 mx-auto space-x-5 bottom-8 drop-shadow-xl" id="inputChat">
      <TextareaAutosize
        rows="1"
        minRows="0"
        cacheMeasurements
        className="flex-grow w-64 p-3 text-gray-400 transition duration-300 transform border-gray-700 rounded-lg shadow-lg bg-slate-900 ring-gray-600 hover:ring-purple-300 "
        placeholder="Ask me anything..."
        name='question'
        onHeightChange={(height, instance) => handleSubmit()}
        onChange={handleInput}

      >
      </TextareaAutosize>
      <button
        onClick={handleSubmit}
        className="text-white transition duration-300 transform bg-purple-700 rounded-full shadow-lg cursor-pointer h-11 w-44 hover:bg-purple-500 hover:scale-110"
      >
        Generate response
      </button>
      {/* <br /> */}
    </div>
  )
}

export default ChatForm;

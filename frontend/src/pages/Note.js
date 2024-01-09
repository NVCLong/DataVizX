import Sidebar from "../components/Sidebar";
import TextareaAutosize from "react-textarea-autosize";
import React, {useState} from "react";
import axios from "axios";

const Note = () => {
  const [note, setNote]= useState([])
  const [error, setError]= useState([])
  const API='http://localhost:3000'

  const handleIpnut = (e) => {
    setNote({...note, [e.target.name]: e.target.value})
  }
  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   try{
  //     await axios.post(`${API}/note/create`)
  //
  //   }catch (e){
  //     setError(e)
  //   }
  // }

  return (
    <div className="flex">
  <div className="#">
    <Sidebar />
  </div>

  <div className="pt-12 pr-10 mx-auto" id="mainClass">
  <h1 className="text-4xl font-bold text-center pb-11 text-white uppercase">Note</h1>
    <div id="inputClass" className="space-y-8">
      <div id="textInput">
        <label
          form="note"
          className="flex justify-center mb-2 text-lg font-medium tracking-wider text-white"
        >
          Note
        </label>
        <TextareaAutosize
          id="note"
          minRows="8"
          className="flex p-2.5 w-96 shadow-lg rounded-lg text-base bg-slate-900 border-gray-700 text-gray-400 ring-gray-600"
          placeholder="Write your note here..."
          onChange={handleIpnut}
        />
      </div>

      <div id="buttonInput" className="flex justify-center items-center">
        <button
          type="button"
          className="px-4 py-2 text-base font-medium rounded-lg focus:z-10 focus:ring-2  dark:bg-purple-600 border-purple-800 text-white hover:text-white hover:bg-purple-400 focus:ring-purple-500 focus:text-white tracking-wider"
          onClick={() => {
            alert("Note submitted");
          }}
        >
          Submit note
        </button>
      </div>
    </div>
  </div>
</div>

  );
};

export default Note;

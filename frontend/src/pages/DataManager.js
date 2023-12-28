import React, { userInput } from "./Chart";
import axios from "axios";

const DataManager = () => {
  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/", {
        userInput,
      });
    } catch (e) {
      console.log("e", e);
    }
  };

  return (
    <div className="save">
      <button className="save_data_button" onClick={submit}>
        Save Data
      </button>
    </div>
  );
};

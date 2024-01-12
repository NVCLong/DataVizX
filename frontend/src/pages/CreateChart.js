import React, { useEffect } from "react";
import "../App.css";
import "./CreateChart.css";
import NarBav from "../Comp_homepage/Navbar";
import { useState } from "react";
import { sendData } from "./DataManager";
import { useNavigate } from "react-router-dom";
import { Button } from "../Comp_homepage/Button";
import "../Comp_homepage/Button.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function Chart() {
  const [inputValue, setInputValue] = useState("");
  const [inputCategory, setInputCategory] = useState("");
  const [inputName, setInputName] = useState("");

  const [intArr, setIntArr] = useState(inputValue.split(",").map(Number));
  const [labelsChart, setLabelsChart] = useState([]);

  const [buttonPressed, setButtonPressed] = useState(true);

  const [DataInput, setDataInput] = useState({
    name: inputName,
    categories: inputCategory,
    values: inputValue,
  });

  const [errorText, seterrorText] = useState("");
  const [errorCategory, seterrorCategory] = useState("");
  const [errorName, seterrorName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {}, [
    inputValue,
    labelsChart,
    buttonPressed,
    intArr,
    inputCategory,
    inputName,
  ]);
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

  const checkIntArray = (arr) => {
    const check = arr.find((element) => {
      return element === 0;
    });
    if (check === 0 || arr.includes(NaN)) return true;
    else {
      seterrorText("");
      return false;
    }
  };

  const checkStr = (str) => {
    if (str.includes("")) {
      return true;
    }
    str.some((element) => {
      if (element.includes(" ")) {
        return true;
      }
    });

    for (let i = 0; i < str.length - 1; i++) {
      for (let j = i + 1; j < str.length; j++) {
        if (str[i] === str[j]) {
          return true;
        }
      }
    }
    seterrorCategory("");
    return false;
  };

  const handleInputCategory = (event) => {
    setInputCategory(event.target.value);
    seterrorCategory("");
    setLabelsChart(event.target.value.split(","));

    setDataInput({
      name: inputName,
      categories: event.target.value,
      values: inputValue,
    });
  };

  const handleInputDataChange = (event) => {
    setInputValue(event.target.value);
    seterrorText("");
    setIntArr(event.target.value.split(",").map(Number));

    setDataInput({
      name: inputName,
      categories: inputCategory,
      values: event.target.value,
    });
    // Update input value in state
  };

  const handleInputName = (event) => {
    setInputName(event.target.value);
    seterrorName("");

    setDataInput({
      name: event.target.value,
      categories: inputCategory,
      values: inputValue,
    });
  };

  let onClick = async (e) => {
    e.preventDefault();
    setButtonPressed(true);
    console.log("Data Input", DataInput);

    if (checkIntArray(intArr) || checkStr(labelsChart)) {
      setButtonPressed(false);
      if (checkIntArray(intArr)) {
        seterrorText("Input right format of Data");
      }
      if (checkStr(labelsChart)) {
        seterrorCategory("Input right format of Labels");
      }
    }

    if (
      intArr.length > 2 &&
      labelsChart.length > 2 &&
      intArr.length === labelsChart.length &&
      inputName.length > 0 &&
      buttonPressed
    ) {
      try {
        const portData = await sendData(DataInput);
        navigate("/chartDetail");
      } catch (error) {
        console.log("error", error.message);
        throw error;
      }
    } else {
      if (intArr.length <= 2) {
        seterrorText("Input must be at least 3 characters long");
      }
      if (labelsChart.length < 2) {
        seterrorCategory("Please input labels for graph");
      }
      if (labelsChart.length != intArr.length) {
        seterrorCategory("Please input number of labels = number of data");
        seterrorText("Please input number of data = number of lables");
      }
      if (inputName.length <= 0) {
        seterrorName("Input a name for Chart please");
      }
    }
  };

  return (
    <div>
      <div className="nav-header">
        <NarBav />
      </div>
      <div className="btn-chartList">
          <Button
            className="btns"
            buttonSize="btn--medium"
            buttonStyle="btn--outline"
            linkUrl={"/ChartListPage"}
            onClick={(e)=>{
              e.preventDefault();
              navigate("/ChartListPage")
            }}
          >
            Go back to Chart List
          </Button>
        </div>
      <div className="user-input">
        <div className="name-input-container">
          <h2 className="input-name">Input name of Chart:</h2>
          <form>
            <input
              type="text"
              className="input-field-name"
              value={inputName}
              onChange={handleInputName}
              placeholder="Input name here..."
              required
              minLength="5"
            />
          </form>
          {errorCategory && <p style={{ color: "red" }}>{errorName}</p>}
        </div>

        <div className="text-input-container">
          <h2 className="input-label">Input Data:</h2>
          <form>
            <input
              type="text"
              className="input-field"
              value={inputValue}
              onChange={handleInputDataChange}
              placeholder="Input here..."
              required
              minLength="3"
            />
          </form>

          {errorText && <p style={{ color: "red" }}>{errorText}</p>}
        </div>

        <div className="category-input-container">
          <h2 className="input-category">Input labels:</h2>
          <form>
            <input
              type="text"
              className="input-field-category"
              value={inputCategory}
              onChange={handleInputCategory}
              placeholder="Input labels here..."
              required
              minLength="5"
            />
          </form>
        </div>
        <button className="custom-button" onClick={onClick}>
          Generate
        </button>
      </div>
      <div id="instruction">
        <p>
          To begin, please fill the Data text area with positive integer
          numbers separated by commas. Do not include any special characters.
          Only numerical values are allowed in this section; refrain from
          inputting alphabets. Simultaneously, in the Labels text area, input
          corresponding labels for each data point, separated by commas. Replace
          spaces in labels with underscores (_) and avoid using accented
          characters. Ensure the number of elements in the Data matches the
          number of elements in Labels for successful pairing. Remember, each
          data point should have a corresponding label. Following these
          guidelines ensures proper formatting and successful processing of your
          inputs.
        </p>
      </div>
    </div>
  );
}

export default Chart;

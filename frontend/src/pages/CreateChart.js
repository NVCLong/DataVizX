import React, { useEffect } from "react";
import "../App.css";
import NarBav from "../Comp_homepage/Navbar";
import { useState } from "react";
import { DataManager } from "./DataManager";

function Chart() {
  const [inputValue, setInputValue] = useState("");
  const [inputCategory, setInputCategory] = useState("");

  const [intArr, setIntArr] = useState(inputValue.split(",").map(Number));
  const [labelsChart, setLabelsChart] = useState([]);

  const [buttonPressed, setButtonPressed] = useState(true);

  const [DataInput, setDataInput] = useState({
    Name: "",
    Data: "",
    Category: "",
  });

  const [errorText, seterrorText] = useState("");
  const [errorCategory, seterrorCategory] = useState("");

  const portData = new DataManager();
  const data = {
    name: "user1",
    categories: inputCategory,
    values: inputValue,
  };

  // document.getElementsByClassName("btn--medium").style.display="none";

  useEffect(() => {}, [
    inputValue,
    labelsChart,
    buttonPressed,
    intArr,
    inputCategory,
  ]);

  const checkIntArray = (arr) => {
    const check = arr.find((element) => {
      return element == 0;
    });
    if (check == 0 || arr.includes(NaN)) return true;
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
        if (str[i] == str[j]) {
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
      Name: "",
      Data: intArr,
      Category: event.target.value.split(" "),
    });
  };

  const handleInputDataChange = (event) => {
    setInputValue(event.target.value);
    seterrorText("");
    setIntArr(event.target.value.split(",").map(Number));

    setDataInput({
      Name: "",
      Data: event.target.value.split(",").map(Number),
      Category: labelsChart,
    });
    // Update input value in state
  };


  let onClick = () => {
    setButtonPressed(true);

    if (checkIntArray(intArr) || checkStr(labelsChart)) {
      setButtonPressed(false);
    }

    if (
      intArr.length > 2 &&
      labelsChart.length > 2 &&
      intArr.length == labelsChart.length &&
      buttonPressed
    ) {
      // portData.portData(data);

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
      document.getElementsByClassName("custom-button").disabled = true;
    }
  };

  return (
    <div>
      <div className="nav-header">
        <NarBav />
      </div>
      <div className="user-input">
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
          <h3 className="input-category">Input Category:</h3>
          <form>
            <input
              type="text"
              className="input-field-category"
              value={inputCategory}
              onChange={handleInputCategory}
              placeholder="Input category here..."
              required
              minLength="5"
            />
          </form>
          {errorCategory && <p style={{ color: "red" }}>{errorCategory}</p>}
        </div>
        <button className="custom-button" onClick={onClick}>
          Generate
        </button>
      </div>
      <div id="instruction">
        <p>To begin, please populate the Data text area with positive integer numbers separated by commas. Do not include any special characters.
        Only numerical values are allowed in this section; refrain from inputting alphabets. Simultaneously, in the Labels text area, input corresponding labels for each data point, separated by commas. 
        Replace spaces in labels with underscores (_) and avoid using accented characters. Ensure the number of elements in the Data matches the number of elements in Labels for successful pairing. 
        Remember, each data point should have a corresponding label. Following these guidelines ensures proper formatting and successful processing of your inputs.</p>
      </div>
    </div>
    
  );
}

export default Chart;

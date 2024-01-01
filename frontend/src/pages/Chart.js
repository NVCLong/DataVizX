import React, { useEffect } from "react";
import "../App.css";
import NarBav from "../Comp_homepage/Navbar";
import "./Chart.css";
import BarChart from "./ChartType/BarChart";
import { useState } from "react";
import LineGraph from "./ChartType/LineGraph";
import PieChart from "./ChartType/PieChart";
import DataManager from "./DataManager";

let userInput = {};

function Chart() {
  const [showChart, setShowChart] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [inputCategory, setInputCategory] = useState("");
  const [selectedOption, setSelectedOption] = useState(""); // State to hold selected option
  const [selectedSortedOption, setselectedSortedOption] = useState("");

  const [intArr, setIntArr] = useState(inputValue.split(" ").map(Number));
  const [labelsChart, setLabelsChart] = useState([]);

  const [buttonPressed, setButtonPressed] = useState(true);

  const [DataInput, setDataInput] = useState({
    Graph: "",
    Data: [],
    Category: "",
    Sort: "",
  });

  userInput = DataInput;

  const [userData, setUserData] = useState({
    labels: [],
    datasets: [
      {
        label: "Data",
        data: [],
        backgroundColor: [],
        borderColor: "",
        borderWidth: 0,
      },
    ],
  });

  const [errorText, seterrorText] = useState("");
  const [errorSort, seterrorSort] = useState("");
  const [errorChart, seterrorChart] = useState("");
  const [errorCategory, seterrorCategory] = useState("");

  useEffect(() => {
    // handleInputDataChange();
    console.log("Labels:", labelsChart);
    console.log("int Arr", intArr)
  }, [
    selectedOption,
    selectedSortedOption,
    inputValue,
    DataInput,
    userData,
    labelsChart,
    showChart,
    buttonPressed,
    intArr,
    inputCategory,
  ]);

  const renderChart = (key) => {
    switch (key) {
      case "Pie Chart":
        return <PieChart chartData={userData} />;
      case "Line Graph":
        return <LineGraph chartData={userData} />;
      case "Bar Chart":
        return <BarChart chartData={userData} />;
      default:
        return <></>;
    }
  };

  const checkIntArray = (arr) => {
    const check = arr.find((element) => {
      return element == 0;
    });
    if (check == 0 || arr.includes(NaN)) return true;
    else {
      seterrorText("");
      setButtonPressed(true);
      return false;
    }
  }

  const checkStr = (str) => {
    if(str.includes("")){
      return true;
    }
    str.forEach((element) => {
      if (element.includes(" ")) {
        return true;
      }
    });

    for(let i=0;i<str.length-1;i++){
      for(let j=i+1;j<str.length;j++){
        if(str[i]==str[j]){
          return true;
        }
      }
    }
    seterrorCategory("");
    setButtonPressed(true);
    return false;
  };

  const handleChartChange = (event) => {
    setSelectedOption(event.target.value);
    seterrorChart("");

    setDataInput({
      Graph: event.target.value,
      Data: intArr,
      Category: labelsChart,
      Sort: selectedSortedOption,
    });
  };

  const handleInputCategory = (event) => {
    setInputCategory(event.target.value);
    seterrorCategory("");
    setLabelsChart(event.target.value.split(","));

    setDataInput({
      Graph: selectedOption,
      Data: intArr,
      Category: event.target.value.split(" "),
      Sort: selectedSortedOption,
    });
  };

  const handleInputDataChange = (event) => {
    setInputValue(event.target.value);
    seterrorText("");
    setIntArr(event.target.value.split(",").map(Number));

    setDataInput({
      Graph: selectedOption,
      Data: event.target.value.split(",").map(Number),
      Category: labelsChart,
      Sort: selectedSortedOption,
    });
    // Update input value in state
  };

  //   document.getElementsByClassName("buttonToChart").style.display = "b";

  const handleSortChange = (event) => {
    setselectedSortedOption(event.target.value);
    seterrorSort("");
    setDataInput({
      Graph: selectedOption,
      Data: intArr,
      Category: labelsChart,
      Sort: event.target.value,
    });
    // Gọi hàm xử lý sắp xếp từ component cha
  };

  let onClick = () => {
    if (checkIntArray(intArr)) {
      seterrorText("Input right format of data");
      setButtonPressed(false);
      setShowChart(false)
    }

    if (checkStr(labelsChart)) {
      seterrorCategory("Input rigt format of category");
      setButtonPressed(false);
      setShowChart(false)

    }

    if (
      selectedOption.length !== 0 &&
      selectedSortedOption.length !== 0 &&
      intArr.length > 2 &&
      labelsChart.length > 2 &&
      intArr.length == labelsChart.length &&
      buttonPressed
    ) {
      setUserData({
        labels: labelsChart,
        datasets: [
          {
            label: "Data",
            data: DataInput.Data,
            backgroundColor: [
              "#FF6633",
              "#FFB399",
              "#FF33FF",
              "#FFFF99",
              "#00B3E6",
              "#E6B333",
              "#3366E6",
              "#999966",
              "#99FF99",
              "#B34D4D",
              "#80B300",
              "#809900",
              "#E6B3B3",
              "#6680B3",
              "#66991A",
            ],
            borderColor: "white",
            borderWidth: 4,
          },
        ],
      });

      setShowChart(true);
    } else {
      if (intArr.length <= 2) {
        seterrorText("Input must be at least 3 characters long");
      }
      if (selectedSortedOption.length === 0) {
        seterrorSort("Please choose an method to sort");
      }
      if (selectedOption.length === 0) {
        seterrorChart("Please choose a chart to present");
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

  // useEffect(() => {
  //     console.log('Text; ', inputValue);
  // }, [selectedOption]);

  // let DataObj = convertData;

  return (
    <div>
      <div className="nav-header">
        <NarBav />
        {/* {document.getElementById("buttonToChart").style.display ="none"} */}
      </div>
      <div className="user-input">
        {/* Selection Graph */}
        <div className="select-container">
          <h2 className="select-label">Choose one graph:</h2>
          <select
            className="select-dropdown"
            value={selectedOption}
            onChange={handleChartChange}
          >
            <option value="">Choose Graph</option>
            <option value="Pie Chart" className="select-option">
              Pie Chart
            </option>
            <option value="Line Graph" className="select-option">
              Line Graph
            </option>
            <option value="Bar Chart" className="select-option">
              Bar Chart
            </option>
            <option value="Table" className="select-option">
              Table
            </option>
          </select>
          {selectedOption && <p>You choose: {DataInput.Graph}</p>}
          {errorChart && <p style={{ color: "red" }}>{errorChart}</p>}
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

        <div className="sort-container">
          <h3>Sorting:</h3>
          <select
            className="selectSort"
            value={selectedSortedOption}
            onChange={handleSortChange}
          >
            <option value="">Choose Sort</option>
            <option value="none">None sort</option>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
          {selectedSortedOption && <p>You choose: {selectedSortedOption}</p>}
          {errorSort && <p style={{ color: "red" }}>{errorSort}</p>}
        </div>

        <button className="custom-button" onClick={onClick}>
          Generate
        </button>
      </div>
      {showChart && buttonPressed && (
        <div className="graph">{renderChart(DataInput["Graph"])}</div>
      )}
    </div>

    
  );
}

export { Chart as default, userInput };

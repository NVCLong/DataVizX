import React, { Fragment, useEffect } from "react";
import "../App.css";
import NarBav from "../Comp_homepage/Navbar";
import "./Chart.css";
import BarChart from "./ChartType/BarChart";
import { useState } from "react";
import { Button } from "../Comp_homepage/Button";
import LineGraph from "./ChartType/LineGraph";
import PieChart from "./ChartType/PieChart";

let userInput = {};

function Chart() {
  const [showChart, setShowChart] = useState(false);

  const [inputValue, setInputValue] = useState(""); // State to hold input value
  const [selectedOption, setSelectedOption] = useState(""); // State to hold selected option
  const [selectedSortedOption, setselectedSortedOption] = useState("");

  const [intArr, setIntArr] = useState([]);

  const [buttonPressed, setButtonPressed] = useState(false);

  const [labelsChart, setLabelsChart] = useState([]);

  const [DataInput, setDataInput] = useState({
    Graph: "",
    Data: [],
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

  useEffect(() => {
    setLabelsChart(
      DataInput.Data.map((value, index) => {
        return "index", index + 1;
      })
    );
    setDataInput({
      Graph: selectedOption,
      Data: intArr,
      Sort: selectedSortedOption,
    });
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
  ]);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    seterrorChart("");
  };

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

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    seterrorText("");
    setIntArr(inputValue.split(" ").map(Number));
    // Update input value in state
  };

  //   document.getElementsByClassName("buttonToChart").style.display = "b";

  const handleOptionChange = (event) => {
    setselectedSortedOption(event.target.value);
    seterrorSort("");
    // Gọi hàm xử lý sắp xếp từ component cha
  };

  let onClick = () => {
    if (buttonPressed === false) {
      setButtonPressed(true);
    }
    console.log("Data to transfer", userInput);

    if (
      selectedOption.length !== 0 &&
      selectedSortedOption.length !== 0 &&
      inputValue.length > 2
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
      if (inputValue.length <= 2) {
        seterrorText("Input must be at least 3 characters long");
      }
      if (selectedSortedOption.length === 0) {
        seterrorSort("Please choose an method to sort");
      }
      if (selectedOption.length === 0) {
        seterrorChart("Please choose a chart to present");
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
        <div className="select-container">
          <h2 className="select-label">Chọn một lựa chọn:</h2>
          <select
            className="select-dropdown"
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <option value="">Chọn một</option>
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
          {selectedOption && <p>Bạn đã chọn: {DataInput.Graph}</p>}
          {errorChart && <p style={{ color: "red" }}>{errorChart}</p>}
        </div>

        <div className="text-input-container">
          <h2 className="input-label">Nhập dữ liệu:</h2>
          <input
            type="text"
            className="input-field"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Nhập vào đây..."
            required
            minLength="3"
          />
          {errorText && <p style={{ color: "red" }}>{errorText}</p>}
        </div>

        <div className="sort-container">
          <h3>Sắp xếp:</h3>
          <select
            className="selectSort"
            value={selectedSortedOption}
            onChange={handleOptionChange}
          >
            <option value="">Choose Sort</option>
            <option value="none">Không sắp xếp</option>
            <option value="ascending">Tăng dần</option>
            <option value="descending">Giảm dần</option>
          </select>
          {selectedSortedOption && <p>Bạn đã chọn: {selectedSortedOption}</p>}
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

import React, { useEffect } from "react";
import "../App.css";
import "./AdvancedOption.css";
import BarChart from "./ChartType/BarChart";
import { useState } from "react";
import LineGraph from "./ChartType/LineGraph";
import PieChart from "./ChartType/PieChart";
import Table from "./ChartType/Table";

let listFindingLabels = [];


const AdvancedOption = ({ staticData, findingValue }) => {
  const [selectedSortedOption, setSelectedSortedOption] = useState("");
  const [selectedGroupingOption, setSelectedGroupingOption] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [showStasticInfo, setShowStasticInfo] = useState(false);
  const [inputFindValue, setInputFindValue] = useState("");
  const [showFindingResult, setShowFindingResult] = useState("");

  const handleSortChange = (event) => {
    setSelectedSortedOption(event.target.value);
  };

  const handleGroupingChange = (event) => {
    setSelectedGroupingOption(event.target.value);
  };

  const handleChartChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleInputFindValue = (event) => {
    setInputFindValue(event.target.value);
  };

  useEffect(() => {
    console.log("result finding labels:", listFindingLabels);

  }, [
    selectedSortedOption,
    selectedGroupingOption,
    selectedOption,
    showStasticInfo,
    inputFindValue,
  ]);

  const onClick_Statistic = () => {
    setShowStasticInfo(true);
  };

  const onClick_Finding = () => {
    const value = parseInt(inputFindValue, 10);
    listFindingLabels = [];
    if (value == NaN || inputFindValue.includes(" ")) {
      setShowFindingResult("Just input number");
      return;
    }
    setShowFindingResult("There is no value like this");
    findingValue.forEach((element) => {
    //   console.log("value of element:", element.value);
    //   console.log("value", value);
      if (element.value == value) {
        setShowFindingResult(`value ${value} is belonged to label(s):`);
        listFindingLabels.push(element.category);
      }
    });
  };
  return (
    <div className="ad_opt">
      <div className="show_info">
        <div className="static-container">
        <h2>Find Max, Min, Median,Mean, 
        Variance and Standard Deviation</h2>
          <button className="static_button" onClick={onClick_Statistic}>
            Statisitc
          </button>
          {showStasticInfo && (
            <div className="sta_info">
              <p>Max: {staticData.max}</p>
              <p>Min: {staticData.min}</p>
              <p>Median: {staticData.median}</p>
              <p>Mean: {staticData.mean}</p>
              <p>Variance: {staticData.variance}</p>
              <p>Standard Deviation: {staticData.standard_deviation}</p>
            </div>
          )}
        </div>
        <div className="find-value-container">
          <h2 className="input-find-value">Input finding value:</h2>
          <form>
            <input
              type="text"
              className="input-find-value"
              value={inputFindValue}
              onChange={handleInputFindValue}
              placeholder="Find Value..."
            />
          </form>
          <button className="custom-button" onClick={onClick_Finding}>
            Generate
          </button>
          {showFindingResult && (
            <div>
              <p>{showFindingResult}</p>
              {listFindingLabels.map((label,index) => {
                return(
                    <p key={index}>+ {label}</p>
                )
              })}
            </div>
          )}
        </div>
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
        {selectedOption && <p>You choose: {selectedOption}</p>}
      </div>
      </div>
      

      <div className="grouping-container">
        <h2>Grouping:</h2>
        <select
          className="selectGrouping"
          value={selectedGroupingOption}
          onChange={handleGroupingChange}
        >
          <option value="">Find</option>
          <option value="high">Higher Median</option>
          <option value="low">Lower Median</option>
        </select>
        {selectedGroupingOption && <p>You choose: {selectedGroupingOption}</p>}
      </div>

      <div className="sort-container">
        <h2>Sorting:</h2>
        <select
          className="selectSort"
          value={selectedSortedOption}
          onChange={handleSortChange}
        >
          <option value="">Choose Sort</option>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
        {selectedSortedOption && <p>You choose: {selectedSortedOption}</p>}
      </div>
    </div>
  );
};

export default AdvancedOption;

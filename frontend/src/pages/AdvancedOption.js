import React, { useEffect } from "react";
import "../App.css";
import "./AdvancedOption.css";
import BarChart from "./ChartType/BarChart";
import { useState } from "react";
import LineGraph from "./ChartType/LineGraph";
import PieChart from "./ChartType/PieChart";
import Table from "./ChartType/Table";

const AdvancedOption = ({
    staticData
}) => {
  const [selectedSortedOption, setSelectedSortedOption] = useState("");
  const [selectedGroupingOption, setSelectedGroupingOption] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [showStasticInfo, setShowStasticInfo] = useState(false);
    const[inputFindValue, setInputFindValue] = useState();
  
  const handleSortChange = (event) => {
    setSelectedSortedOption(event.target.value);
  };

  const handleGroupingChange = (event) => {
    setSelectedGroupingOption(event.target.value);
  };

  const handleChartChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {}, [selectedSortedOption, selectedGroupingOption]);

  const onClick = () => {
    setShowStasticInfo(true)
    
  };
  return (
    <div className="ad_opt">
      <div className="static-container">
        <button className="static_button" onClick={onClick}>
          Statisitc
        </button>
        {showStasticInfo && <div className="sta_info">
        <p>Max: {staticData.max}</p>
        <p>Min: {staticData.min}</p>
        <p>Median: {staticData.median}</p>
        <p>Mean: {staticData.mean}</p>
        <p>Variance: {staticData.variance}</p>
        <p>Standard Deviation: {staticData.standard_deviation}</p>
        </div>
        }
      </div>
      <div className="find-value-container">
          <h2 className="input-find-value">Input name of Chart:</h2>
          <form>
            <input
              type="text"
              className="input-find-value"
              value={inputFindValue}
              onChange={handleInputFindValue}
              placeholder="Find Value..."
              required
              minLength="1"
            />
          </form>
          {errorCategory && <p style={{ color: "red" }}>{errorName}</p>}
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

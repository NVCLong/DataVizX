import React, { useEffect } from "react";
import "../App.css";
import "./AdvancedOption.css";
import BarChart from "./ChartType/BarChart";
import { useState } from "react";
import LineGraph from "./ChartType/LineGraph";
import PieChart from "./ChartType/PieChart";
import Table from "./ChartType/Table";

let listFindingLabels = [];

const AdvancedOption = ({
  statisData,
  findingValue,
  ascending,
  descending,
  highMed,
  lowMed,
}) => {
  const [selectedSortedOption, setSelectedSortedOption] = useState("");
  const [selectedGroupingOption, setSelectedGroupingOption] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [showStasticInfo, setShowStasticInfo] = useState(false);
  const [inputFindValue, setInputFindValue] = useState("");
  const [showFindingResult, setShowFindingResult] = useState("");

  const asc_labels = ascending.categories.split(",");
  const asc_values = ascending.values.split(",").map(Number);

  const desc_labels = descending.categories.split(",");
  const desc_values = descending.values.split(",").map(Number);

  const highMed_labels = highMed.categories.split(",");
  const highMed_values = highMed.values.split(",").map(Number);

  const lowMed_labels = lowMed.categories.split(",");
  const lowMed_values = lowMed.values.split(",").map(Number);

  const [userDataSort, setUserDataSort] = useState({
    labels: [],
    datasets: [
      {
        label: "Data",
        data: [],
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

  const [userDataGroup, setUserDataGroup] = useState({
    labels: [],
    datasets: [
      {
        label: "Data",
        data: [],
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

  const renderChartSort = (key) => {
    switch (key) {
      case "Pie Chart":
        return <PieChart chartData={userDataSort} />;
      case "Line Graph":
        return <LineGraph chartData={userDataSort} />;
      case "Bar Chart":
        return <BarChart chartData={userDataSort} />;
      case "Table":
        return <Table chartData={userDataSort} />;
      default:
        return <></>;
    }
  };

  const renderChartGroup = (key) => {
    switch (key) {
      case "Pie Chart":
        return <PieChart chartData={userDataGroup} />;
      case "Line Graph":
        return <LineGraph chartData={userDataGroup} />;
      case "Bar Chart":
        return <BarChart chartData={userDataGroup} />;
      case "Table":
        return <Table chartData={userDataGroup} />;
      default:
        return <></>;
    }
  };

  const handleSortChange = (event) => {
    setSelectedSortedOption(event.target.value);

    if (event.target.value == "ascending") {
      setUserDataSort({
        labels: asc_labels,
        datasets: [
          {
            label: "Data",
            data: asc_values,
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
    } else if (event.target.value == "descending") {
      setUserDataSort({
        labels: desc_labels,
        datasets: [
          {
            label: "Data",
            data: desc_values,
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
    }
  };

  const handleGroupingChange = (event) => {
    setSelectedGroupingOption(event.target.value);

    if (event.target.value == "high") {
      console.log("true high");
      setUserDataGroup({
        labels: highMed_labels,
        datasets: [
          {
            label: "Data",
            data: highMed_values,
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
    } else if (event.target.value == "low") {
      console.log("true high");
      setUserDataGroup({
        labels: lowMed_labels,
        datasets: [
          {
            label: "Data",
            data: lowMed_values,
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
    }
  };

  const handleChartChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleInputFindValue = (event) => {
    setInputFindValue(event.target.value);
  };

  useEffect(() => {}, [
    selectedSortedOption,
    selectedGroupingOption,
    selectedOption,
    showStasticInfo,
    inputFindValue,
    selectedGroupingOption,
    showFindingResult,
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
          <h2>Find Max, Min, Median,Mean, Variance and Standard Deviation</h2>
          <button className="static_button" onClick={onClick_Statistic}>
            Statisitc
          </button>
          {showStasticInfo && (
            <div className="sta_info">
              <p>
                Max: {statisData.max.value} ({statisData.max.category})
              </p>
              <p>
                Min: {statisData.min.value} ({statisData.min.category})
              </p>
              <p>
                Median: {statisData.median.value} ({statisData.median.category})
              </p>
              {statisData.stand.value == null && (
                <p>Standard Deviation: empty </p>
              )}
              {statisData.stand.value != null && (
                <p>Standard Deviation: {statisData.stand.value} </p>
              )}
            </div>
          )}
        </div>
        <div className="find-value-container">
          <h2>Input finding value:</h2>
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
              {listFindingLabels.map((label, index) => {
                return <p key={index}>+ {label}</p>;
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

      <div className="show_ad_chart">
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
          {selectedGroupingOption && (
            <p>You choose: {selectedGroupingOption}</p>
          )}
          <div className="graphGroup">
            {selectedOption &&
              selectedGroupingOption &&
              renderChartGroup(selectedOption)}
          </div>
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
          <div className="graphSort">
            {selectedOption &&
              selectedSortedOption &&
              renderChartSort(selectedOption)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedOption;

/* eslint-disable no-restricted-globals */
import React, { useEffect } from "react";
import "../App.css";
import NarBav from "../Comp_homepage/Navbar";
import "./ChartDetail.css";
import BarChart from "./ChartType/BarChart";
import { useState } from "react";
import LineGraph from "./ChartType/LineGraph";
import PieChart from "./ChartType/PieChart";
import Table from "./ChartType/Table";
import {
  getDataRaw,
  getStatisticData,
  getGroupData,
  getSortData,
  patchNewData,
} from "./DataManager";
import AdvancedOption from "./AdvancedOption";
import { useNavigate } from "react-router-dom";
import { Button } from "../Comp_homepage/Button";
import "../Comp_homepage/Button.css";

// const findingValue = [
//   {
//     category : "a",
//     value: 21
//   },
//   {
//     category : "b",
//     value: 31
//   },
//   {
//     category : "d",
//     value: 11
//   },
//   {
//     category : "f",
//     value: 25
//   },
// ]

// const ascending = {
//   categories: "d,a,f,b",
//   values: "11,21,25,31",
// };

const descending = {
  categories: "b,f,a,d",
  values: "31,25,21,11",
};

// const highMed = {
//   categories: "a,f,b",
//   values: "21,25,31",
// };

// const lowMed = {
//   categories: "d,a,f",
//   values: "11,21,25",
// };

function Chart() {
  const colorTemplate = [
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
  ]
  // const groupData = new getGroupData();

  const [showChart, setShowChart] = useState(true);

  const [inputValue, setInputValue] = useState("");
  const [inputCategory, setInputCategory] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [inputName, setInputName] = useState(""); // State to hold selected option
  const [selectedSortedOption, setselectedSortedOption] = useState("");

  const [intArr, setIntArr] = useState();
  const [labelsChart, setLabelsChart] = useState();

  const [buttonPressed, setButtonPressed] = useState(true);

  const [rawData, setRawData] = useState({
    Name: inputName,
    Categories: inputCategory.split(","),
    Values: inputValue.split(",").map(Number),
  });

  const [statisData, setStatisData] = useState({});
  const [findingValue, setFindingValue] = useState([]);
  const [highMed, setHighMed] = useState({
    categories: "",
    values: "",
  });
  const [lowMed, setLowMed] = useState({
    categories: "",
    values: "",
  });

  const [ascending, setAscending] = useState({
    categories: "",
    values: "",
  });
  const [descending, setDescending] =useState({
    categories: "",
    values: "",
  })

  const [userData, setUserData] = useState({});

  const [errorText, seterrorText] = useState("");
  const [errorName, seterrorName] = useState("");
  const [errorChart, seterrorChart] = useState("");
  const [errorCategory, seterrorCategory] = useState("");

  // const portData = new DataManager();
  const data = {
    name: inputName,
    categories: inputCategory,
    values: inputValue,
  };

  const navigate = useNavigate();

  // document.getElementsByClassName("btn--medium").style.display="none";

  useEffect(() => {
    fetchRawData();
    fetchStatisticData();
    fetchGroupData();
    fetchSortData();
    // console.log("raw data cate detail", rawData.Categories)
  }, [selectedOption]);

  const fetchRawData = async () => {
    const res = await getDataRaw();
    console.log("result:   "+res)

    const ObjArr = [];
    res.values.map((item) => {
      ObjArr.push(item);
    });

    const cateList = [];
    ObjArr.map((item) => {
      cateList.push(item.category);
    });

    const valueList = [];
    ObjArr.map((item) => {
      valueList.push(item.value);
    });

    const chartName = res.name;
    // console.log("cate List", cateList)
    // console.log("val list",valueList)
    // console.log("name",chartName)

    // setChartLables(cateList);
    // setChartValues(valueList)
    // setChartName(chartName)

    setFindingValue(ObjArr);

    setIntArr(valueList);
    setLabelsChart(cateList);
    setInputName(chartName);

    setInputValue(valueList.map((num) => num.toString()).join(","));
    setInputCategory(cateList.map((ele) => ele).join(","));

    setRawData({
      name: chartName,
      categories: cateList,
      values: valueList.map(Number),
    });

    setUserData({
      labels: labelsChart,
      datasets: [
        {
          label: "Data",
          data: intArr,
          backgroundColor: colorTemplate,
          borderColor: "white",
          borderWidth: 4,
        },
      ],
    });
  };

  const fetchGroupData = async () => {
    try {
      const res = await getGroupData();

      const collectionHigh = res.collectionAboveValues.collectionAboveValues;
      const collectionLow = res.colletcionBelowValues.colletcionBelowValues;

      const highCategories = Object.keys(collectionHigh);
      const highValues = highCategories.map(
        (category) => collectionHigh[category][0].value
      );
      setHighMed({
        categories: highCategories.join(","),
        values: highValues.join(","),
      });

      console.log(highMed)

      const lowCategories = Object.keys(collectionLow);
      const lowValues = lowCategories.map(
        (category) => collectionLow[category][0].value
      );
      setLowMed({
        categories: lowCategories.join(","),
        values: lowValues.join(","),
      });

      // console.log("collection high:",collectionHigh);
      // console.log("collection low",collectionLow);
      // console.log("high med",highMed)
      // console.log("low med",lowMed)
    } catch (error) {
      console.log("error group", error);
    }
  };

  const fetchStatisticData = async () => {
    const res = await getStatisticData();

    const ObjArr = [];
    Object.keys(res).forEach((key) => {
      ObjArr.push(res[key]);
    });

    setStatisData({
      max: ObjArr[0],
      min: ObjArr[1],
      median: ObjArr[2],
      stand: ObjArr[3],
    });

    // console.log("Obj sta", ObjArr)
    // console.log("statis Data", statisData)
  };

  const fetchSortData = async () => {
    try {
      const res = await getSortData();
      console.log(res)

      const ascCollect = res.sortedCollection;
      const descCollect = res.sortedCollectionDesc

      const ascCategories = ascCollect.map((item) => item.category).join(",");
      const ascValues = ascCollect.map((item) => item.value).join(",");

      const descCategories = descCollect.map((item)=>{return item.category}).join(",");
      const descValues = descCollect.map((item)=>{return item.value}).join(",")

      setAscending({
        categories: ascCategories,
        values: ascValues, 
      })
      setDescending({
        categories: descCategories,
        values: descValues
      })

      // console.log("asc coll", ascCollect);
      // console.log("ascending collection",ascending)
    } catch (error) {
      console.log("error sort", error);
      throw error;
    }
  };

  const [DataInput, setDataInput] = useState({
    Name: inputName,
    Categories: inputCategory,
    Values: inputValue,
  });

  const renderChart = (key) => {
    switch (key) {
      case "Pie Chart":
        return <PieChart chartData={userData} />;
      case "Line Graph":
        return <LineGraph chartData={userData} />;
      case "Bar Chart":
        return <BarChart chartData={userData} />;
      case "Table":
        return <Table chartData={userData} />;
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
  const handleInputName = (event) => {
    setInputName(event.target.value);
    seterrorName("");

    setDataInput({
      Name: event.target.value,
      Data: inputValue,
      Category: inputCategory,
    });
  };

  const handleChartChange = (event) => {
    setSelectedOption(event.target.value);
    seterrorChart("");

    setDataInput({
      Name: inputName,
      Data: inputValue,
      Category: inputCategory,
    });
  };

  const handleInputCategory = (event) => {
    setInputCategory(event.target.value);
    seterrorCategory("");
    // setLabelsChart(event.target.value.split(","));

    // setDataInput({
    //   Data: intArr,
    //   Data: inputValue,
    //   Category: event.target.value,
    // });
  };

  const handleInputDataChange = (event) => {
    setInputValue(event.target.value);
    seterrorText("");
    // setIntArr(event.target.value.split(",").map(Number));

    setDataInput({
      Name: inputName,
      Data: event.target.value,
      Category: inputCategory,
    });
    // Update input value in state
  };

  //   document.getElementsByClassName("buttonToChart").style.display = "b";

  // const handleSortChange = (event) => {
  //   setselectedSortedOption(event.target.value);
  //   setDataInput({
  //     Graph: selectedOption,
  //     Data: intArr,
  //     Category: labelsChart,
  //     Sort: event.target.value,
  //   });
  //   // Gọi hàm xử lý sắp xếp từ component cha
  // };

  let onClick = async (e) => {
    setShowChart(true);

    setButtonPressed(true);

    if (checkIntArray(intArr) || checkStr(labelsChart)) {
      setButtonPressed(false);
      if (checkIntArray(intArr)) {
        seterrorText("Input right format of Data");
      }
      if (checkStr(labelsChart)) {
        seterrorCategory("Input right format of Labels");
      }
    }

    setDataInput({
      Name: inputName,
      Data: inputValue,
      Category: inputCategory,
    });

    console.log("raw data",rawData);
    if (
      intArr.length > 2 &&
      labelsChart.length > 2 &&
      intArr.length == labelsChart.length &&
      inputName.length > 0 &&
      buttonPressed
    ) {
      try {
        // const patchData = await patchNewData(DataInput);
        // navigate("/chartDetail");
      } catch (error) {
        alert("Cannot patch");
        console.log("error", error.message);
        throw error;
      }
      // location.reload();
    } else {
      setShowChart(false);
      if (intArr.length <= 2) {
        seterrorText("Input must be at least 3 characters long");
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
      </div>
      <div className="btn-chartList">
          <Button
            className="btns"
            buttonSize="btn--medium"
            buttonStyle="btn--outline"
            linkUrl={"/chartList"}
          >
            Go back to Chart List
          </Button>
        </div>
      <div className="put_data">
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
              minLength="1"
            />
          </form>
          {errorCategory && <p style={{ color: "red" }}>{errorName}</p>}
        </div>
        <div className="user-input">
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
            <h3 className="input-category">Input labels:</h3>
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
            {errorCategory && <p style={{ color: "red" }}>{errorCategory}</p>}
          </div>

          <button className="custom-button" onClick={onClick}>
            Save Data
          </button>
        </div>
        {showChart && (
          <div className="graph">{renderChart(selectedOption)}</div>
        )}
      </div>

      <hr></hr>
      <AdvancedOption
        statisData={statisData}
        findingValue={findingValue}
        ascending={ascending}
        descending={descending}
        highMed={highMed}
        lowMed={lowMed}
        colorTemplate={colorTemplate}
        rawDataCategories={rawData.categories}
      />
    </div>
  );
}

export default Chart;

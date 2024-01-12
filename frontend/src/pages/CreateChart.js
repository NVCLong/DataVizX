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

  let [buttonPressed, setButtonPressed] = useState(false);

  const [DataInput, setDataInput] = useState({
    name: inputName,
    categories: inputCategory,
    values: inputValue,
  })

  const [errorText, seterrorText] = useState("");
  const [errorCategory, seterrorCategory] = useState("");
  const [errorName, seterrorName] = useState("");

  const navigate = useNavigate();

  useEffect(() => { }, [
    inputValue,
    labelsChart,
    intArr,
    inputCategory,
    inputName,
    errorText,
    errorCategory,
    errorName,
  ]);

  const handleVerify = async (e) => {
    const userId = localStorage.getItem("userId");
    let accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const decoded = jwtDecode(accessToken);
    const refreshDecoded = jwtDecode(refreshToken);
    const refreshExpireTime = refreshDecoded.exp * 1000;
    const expirationTime = decoded.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();
    if (currentTime > expirationTime) {
      if (currentTime < refreshExpireTime) {
        await axios.post("http://localhost:3000/verify/refresh", { refreshToken: refreshToken, userId: userId })
          .then(response => {
            //  console.log(response.data)
            localStorage.setItem('accessToken', response.data.newAccessToken)
          }).catch(error => {
            //  console.log(error)
          })
      } else {
        localStorage.clear()
        navigate("/login")
      }
    }
    if (!accessToken) {
      // console.log("access token expried")
      localStorage.clear()
      navigate("/login")
    } else {
      accessToken = localStorage.getItem("accessToken")
      const verify = await axios.post("http://localhost:3000/verify", { access_token: accessToken })
      if (verify.data.status === "false") {
        localStorage.clear()
        navigate("/login")
      }
    }
  }
  useEffect(() => {
    handleVerify()
  }, [])

  const checkIntArray = (arr) => {
    let check = 1;
    check = arr.find((element) => {
      return element === 0
    })
    if (check === 0 || arr.includes(NaN)) {
      return true;
    }
    else {
      seterrorText("")
      return false
    }
  };

  const checkStr = (str) => {
    if (str.includes("")) {
      setButtonPressed(false)
      return true
    }
    str.some((element) => {
      if (element.includes(" ")) {
        return true
      }
    })

    for (let i = 0; i < str.length - 1; i++) {
      for (let j = i + 1; j < str.length; j++) {
        if (str[i] === str[j]) {
          return true
        }
      }
    }
    seterrorCategory("");
    return false
  }

  const handleInputCategory = (event) => {
    setInputCategory(event.target.value);
    seterrorCategory("");
    setLabelsChart(event.target.value.split(","));
    setDataInput({
      name: inputName,
      categories: event.target.value,
      values: inputValue,
    })
  }

  const handleInputDataChange = (event) => {
    setInputValue(event.target.value)
    seterrorText("")
    setIntArr(event.target.value.split(",").map(Number));

    setDataInput({
      name: inputName,
      categories: inputCategory,
      values: event.target.value,
    })
    // Update input value in state
  }

  const handleInputName = (event) => {
    setInputName(event.target.value);
    seterrorName("");

    setDataInput({
      name: event.target.value,
      categories: inputCategory,
      values: inputValue,
    })
  }

  let onClick = async (e) => {
    e.preventDefault();
    if (checkIntArray(intArr) || checkStr(labelsChart)) {
      if (checkIntArray(intArr)) {
        seterrorText("Input right format of Data")
      }
      if (checkStr(labelsChart)) {
        seterrorCategory("Input right format of Labels")
      }
    }


    if (
      intArr.length > 2 &&
      labelsChart.length > 2 &&
      intArr.length == labelsChart.length &&
      inputName.length > 0 &&
      !(checkIntArray(intArr)) &&
      !(checkStr(labelsChart))
    ) {
      console.log("true")
      try {
        const portData = await sendData(DataInput);
        navigate("/chartDetail");
      } catch (error) {
        console.log("error", error.message);
        throw error;
      }
    } else {
      if (intArr.length <= 2) {
        seterrorText("Input must be at least 3 characters long")
      }
      if (labelsChart.length < 2) {
        seterrorCategory("Please input labels for graph")
      }
      if (labelsChart.length != intArr.length) {
        seterrorCategory("Please input number of labels = number of data")
        seterrorText("Please input number of data = number of lables")
      }
      if (inputName.length <= 0) {
        seterrorName("Input a name for chart, please")
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
          onClick={(e) => {
            e.preventDefault()
            navigate("/ChartListPage")
          }}
        >
          Go back to chart list
        </Button>
      </div>
      <div className="user-input">
        <div className="name-input-container">
          <h2 className="input-name">Input name/title of chart:</h2>
          <form>
            <input
              type="text"
              className="input-field-name"
              value={inputName}
              onChange={handleInputName}
              placeholder="Input name/title of chart..."
              required
              minLength="5"
            />
          </form>
          {errorCategory && <p style={{ color: "red" }}>{errorName}</p>}
        </div>

        <div className="text-input-container">
          <h2 className="input-label">Input data/value:</h2>
          <form>
            <input
              type="text"
              className="input-field"
              value={inputValue}
              onChange={handleInputDataChange}
              placeholder="Input data/value..."
              required
              minLength="3"
            />
          </form>

          {errorText && <p style={{ color: "red" }}>{errorText}</p>}
        </div>

        <div className="category-input-container">
          <h2 className="input-category">Input label of each data/value:</h2>
          <form>
            <input
              type="text"
              className="input-field-category"
              value={inputCategory}
              onChange={handleInputCategory}
              placeholder="Input label of each data/value..."
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
        Data/value:<br></br>
              Enter positive integers only, separated by commas.<br></br>
              No letters or special characters allowed.<br></br>
              <br></br>
        Label of each data/value:<br></br>
              Enter corresponding labels for each data point, separated by commas.<br></br>
              Replace spaces with underscores (_).<br></br>
              Avoid accented characters.<br></br>
              <br></br>
        Important!!!<br></br>
              Number of data points must match number of labels.<br></br>
              Match each data point with its corresponding label.<br></br>
        </p>
      </div>
    </div>
  );
}

export default Chart;

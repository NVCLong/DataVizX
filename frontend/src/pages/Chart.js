import React, { Fragment, useEffect } from "react";
import '../App.css';
import NarBav from '../Comp/Navbar';
import './Chart.css';
import BarChart from "./ChartType/BarChart";
import { UserData } from "./Data";
import { useState } from "react";
import LineGraph from "./ChartType/LineGraph";
import PieChart from "./ChartType/PieChart";





function Chart() {

    const option = {
        plugins: {
            legend: {
                display: true,
                position: "bottom",
            },
            title: {
                text: "tamu"
            }
        }
    }

    const [userData, setUserData] = useState({
        labels: UserData.map((data) => data.year),
        datasets: [{
            label: "Users Lost",
            data: UserData.map((data) => data.userGain),
            backgroundColor: ["cyan"],
            borderColor: "white",
            borderWidth: 2,
        }],

    })

    const [selectedOption, setSelectedOption] = useState(''); // State to hold selected option

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
        setShowChart(false);
    };




    const renderChart = (key) => {

        switch (key) {
            case "Pie Chart":
                return (
                    <PieChart chartData={userData} />)
            case "Line Graph":
                return (<LineGraph chartData={userData} />)
            case "Bar Chart":
                return (<BarChart chartData={userData} options={option} />)
            default:
                return Fragment
        }
    }




    const [inputValue, setInputValue] = useState(''); // State to hold input value

    const handleInputChange = (event) => {
        setInputValue(event.target.value); // Update input value in state
    };



    const [selectedSortedOption, setselectedSortedOption] = useState('');

    const handleOptionChange = (event) => {
        setselectedSortedOption(event.target.value);// Gọi hàm xử lý sắp xếp từ component cha
    };




    const [showChart, setShowChart] = useState(false);

    const onClick = () => {
        setShowChart(true);
    }

    // useEffect(() => {
    //     console.log('Text; ', inputValue);
    // }, [selectedOption]);



    useEffect(() => {
        console.log('selected', selectedOption);
        console.log("selectSort ",selectedSortedOption)
    }, [selectedOption, selectedSortedOption]);



    return (
        <div>
            <div className="nav-header">
                <NarBav />
            </div>
            <div className="user-input">
                <div className="select-container">
                    <h2 className="select-label">Chọn một lựa chọn:</h2>
                    <select className="select-dropdown" value={selectedOption} onChange={handleSelectChange}>
                        <option value="">Chọn một</option>
                        <option value="Pie Chart" className="select-option">Pie Chart</option>
                        <option value="Line Graph" className="select-option">Line Graph</option>
                        <option value="Bar Chart" className="select-option">Bar Chart</option>
                        <option value="Table" className="select-option">Table</option>
                    </select>
                    {selectedOption && <p>Bạn đã chọn: {selectedOption}</p>}
                </div>




                <div className="text-input-container">
                    <h2 className="input-label">Nhập dữ liệu:</h2>
                    <input
                        type="text"
                        className="input-field"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Nhập vào đây..."
                    />
                </div>



                <div className='sort-container'>
                    <h3>Sắp xếp:</h3>
                    <select className="selectSort" value={selectedSortedOption} onChange={handleOptionChange}>
                        <option value="none">Không sắp xếp</option>
                        <option value="ascending">Tăng dần</option>
                        <option value="descending">Giảm dần</option>
                    </select>
                </div>
        



                <button className="custom-button" onClick={onClick} >
                    Generate
                </button>
            </div>
            {showChart &&
                <div className="graph">
                    {renderChart(selectedOption)}
                </div>

            }


        </div>
    )
}

export default Chart;
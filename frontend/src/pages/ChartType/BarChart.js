import React, { useState } from "react";
import {Bar} from "react-chartjs-2";



function BarChart({chartData}, {option}){
    
    return (
        <>
        
            <Bar data={chartData} options={option}/>;
        </>
    )
}

export default BarChart;
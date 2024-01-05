import React, { useState } from "react";
import {Pie} from "react-chartjs-2";



function PieChart({chartData}){

    return (
        <>
            <Pie data={chartData}/>;
        </>
    )
}

export default PieChart;
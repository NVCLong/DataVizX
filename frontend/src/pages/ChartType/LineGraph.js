import React, { useState } from "react";
import {Line} from "react-chartjs-2";



function LineGraph({chartData}){

    return (
        <>
            <Line data={chartData}/>;
        </>
    )
}

export default LineGraph;
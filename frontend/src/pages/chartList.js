import Sidebar from "../components/Sidebar";
import React, {useEffect, useState} from "react";
import axios from "axios";

function ChartList() {

//   // Get api
// export const login = async (identifier, password) => {
//   try {
//     const
//     const response = await axios.get:(`http://localhost:3000/chartList`, {

//     });
//     console.log(response.data.accessToken);
//     localStorage.setItem("accessToken",response.data.accessToken)
//     localStorage.setItem("refreshToken",response.data.refreshToken)
//     return response.data;

//   } catch (error) {
//     console.error("Login failed", error);
//     throw error;
//   }
// };

  return (
    <div>
      <div>
        <Sidebar/>
      </div>
      <div>
        <h1>ChartList</h1>
      </div>
    </div>
  );
}

export default ChartList;

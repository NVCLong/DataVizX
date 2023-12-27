import Sidebar from "../components/Sidebar";
import React, {useEffect, useState} from "react";
import axios from "axios";

function ChartList() {

    async function getToken(){
        try {
            const response = await axios.post('http://localhost:3000/auth/login');
            const token = response.data.accessToken;
            console.log(token)
            setToken(token);
            localStorage.setItem('token', token);
        } catch (error) {

        }
    }

    useEffect(() => {
        getToken();
    }, []);

    console.log(getToken)


    //save token to local storage
    const [token, setToken] = useState('');
    useEffect(() => {
        localStorage.setItem('token', token);
    }, [token]);

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

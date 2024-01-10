import axios from "axios";
import { useState } from "react";

const API_URL = "http://localhost:3000";
export const axiosJWT = axios.create();

export const sendData = async (userData) => {
  // userData.preventDefault(); // preventDefault is used on events, not on data objects
  try {
    const response = await axios.post(
      `${API_URL}/collection/add`,
      {
        name: userData.name,
        categories: userData.categories,
        values: userData.values,
      },
      {
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
      }
    );
    // console.log("Response from server:", response.data);
    localStorage.setItem("UsingchartId", response.data.chartId);
    // localStorage.removeItem("UsinngchartId")
    // Add any further handling of the response here, if needed
    return response.data; // Returning data if necessary
  } catch (error) {
    console.error("Error while sending data:", error);
    throw error; // Re-throw the error for further handling if necessary
  }
};

export const getDataRaw = async () => {
  // const values = [];

  const retrievedValue = localStorage.getItem("UsingchartId");
  try {
    const response = await axios.get(`${API_URL}/collection/${retrievedValue}`);
    console.log("response value raw: ", response.data.values);
    // response.data.values.map((item) => {
    //   values.push(item);
    // });
    // console.log("values: ", values[0]);
    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};


export const getStatisticData = async () => {
  const values = [];

  const retrievedValue = localStorage.getItem("UsingchartId");
  try {
    const response = await axios.get(`${API_URL}/collection/statistic/${retrievedValue}`);
    Object.keys(response.data).forEach((key) => {
      // console.log(key,response.data[key])
      values.push(response.data[key])

    })
    console.log("response value statistic: ", response.data);
    // response.data.map((item) => {
    //   values.push(item);
    // });
    // console.log("values: ", values);
    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

export const getGroupData = async () => {

  const retrievedValue = localStorage.getItem("UsingchartId");
  try {
    const response = await axios.get(`${API_URL}/collection/groupData/${retrievedValue}`);
    // Object.keys(response.data).forEach((key)=>{
    //   // console.log(key,response.data[key])
    //   values.push(response.data[key])

    // })
    console.log("response value group: ", response.data);
    // response.data.map((item) => {
    //   values.push(item);
    // });
    // console.log("values: ", values);
    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

export const getSortData = async () => {

  const retrievedValue = localStorage.getItem("UsingchartId");
  try {
    const response = await axios.get(`${API_URL}/collection/sort/${retrievedValue}`);
    // Object.keys(response.data).forEach((key)=>{
    //   // console.log(key,response.data[key])
    //   values.push(response.data[key])

    // })
    console.log("response value sort: ", response.data);
    // response.data.map((item) => {
    //   values.push(item);
    // });
    // console.log("values: ", values);
    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}


export const patchNewData = async (userData) => {
  const retrievedValue = localStorage.getItem("UsingchartId");


  try {


    const response = await axios.patch(
      `${API_URL}/collection/edit/${retrievedValue}`,
      {
        "name": userData.Name,
        "categories": userData.Category,
        "values": userData.Data,
      },
    );
    console.log("Response Patch Data", response.data)
    // console.log("Response from server:", response.data);
    // localStorage.removeItem("UsinngchartId")
    // Add any further handling of the response here, if needed
    return response.data; // Returning data if necessary
  } catch (error) {
    console.error("Error while sending data:", error);
    throw error; // Re-throw the error for further handling if necessary
  }
}


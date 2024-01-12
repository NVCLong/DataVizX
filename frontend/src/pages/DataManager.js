import axios from "axios";

const API_URL = "https://datavizx.onrender.com";
export const axiosJWT = axios.create();

export const sendData = async (userData) => {
  try {
    const response = await axios.post(
      `${API_URL}/collection/add`,
      {
        userId: localStorage.getItem("userId"),
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

    localStorage.setItem("chartId", response.data.chartId);

    return response.data;
  } catch (error) {
    console.error("Error while sending data:", error);
    throw error;
  }
};

export const getDataRaw = async () => {
  const retrievedValue = localStorage.getItem("chartId");
  try {
    const response = await axios.get(`${API_URL}/collection/${retrievedValue}`);
    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export const getStatisticData = async () => {
  const values = [];

  const retrievedValue = localStorage.getItem("chartId");
  try {
    const response = await axios.get(
      `${API_URL}/collection/statistic/${retrievedValue}`
    );
    Object.keys(response.data).forEach((key) => {
      values.push(response.data[key]);
    });

    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export const getGroupData = async () => {
  const retrievedValue = localStorage.getItem("chartId");
  try {
    const response = await axios.get(
      `${API_URL}/collection/groupData/${retrievedValue}`
    );
    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export const getSortData = async () => {
  const retrievedValue = localStorage.getItem("chartId");
  try {
    const response = await axios.get(
      `${API_URL}/collection/sort/${retrievedValue}`
    );
    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export const patchNewData = async (userData) => {
  const retrievedValue = localStorage.getItem("chartId");
  try {
    const response = await axios.patch(
      `${API_URL}/collection/edit/${retrievedValue}`,
      {
        name: userData.Name,
        categories: userData.Categories,
        values: userData.Values,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error while sending data:", error);
    throw error;
  }
};

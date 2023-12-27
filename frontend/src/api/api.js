import axios from "axios";
const API_URL = "http://localhost:3000";

// Login function
export const login = async (identifier, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      identifier,
      password,
    });
    console.log(response.data.accessToken);
    localStorage.setItem("accessToken",response.data.accessToken)
    localStorage.setItem("refreshToken",response.data.refreshToken)
    //get cookie from response


    document.cookie=`userId=${response.data.user._id}`
    return response.data;

  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
};

// Register function
export const register = async (userName, email, password) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/auth/register`,
      { userName, email, password },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.error("Registration failed", error);
    throw error;
  }
};

// Forget Password function
export const forgetPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/auth/forget`, { email });
    return response.data;
  } catch (error) {
    console.error("Forget password failed", error);
    throw error;
  }
};

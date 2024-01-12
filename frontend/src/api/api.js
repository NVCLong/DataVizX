import axios from "axios";
const API_URL = "http://localhost:3000";

// Login function
export const login = async (identifier, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      identifier,
      password,
    });
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    localStorage.setItem("userId", response.data.userDetails._id);
    //get cookie from response
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
      { userName, email, password }
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

//ChartList function
// export const chartList = async () => {
//   try {
//     // let accessToken = localStorage.getItem("accessToken")
//     let userId = localStorage.getItem("userId");
//     if (!userId) {
//       throw new Error("Do not have userId");
//     }
//     await axios
//       .get(`http://localhost:3000/chartList/${userId}`)
//       .then((response) => {
//         console.log(response);
//         return response.data;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

//Get user image function
// export const User = async () => {
//   try {
//     // let accessToken = localStorage.getItem("accessToken")
//     let userId = localStorage.getItem("userId");
//     if (!userId) {
//       throw new Error("Do not have userId");
//     }
//     await axios
//       .get(`http://localhost:3000/user/${userId}`)
//       .then((response) => {
//         console.log(response);
//         return response.data;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

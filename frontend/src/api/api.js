import axios from 'axios';

const API_URL = '#######';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Login failed', error);
    throw error;
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, email, password });
    return response.data;
  } catch (error) {
    console.error('Registration failed', error);
    throw error;
  }
};

export const forgetPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/forget`, { email });
    return response.data;
  } catch (error) {
    console.error('Forget password failed', error);
    throw error;
  }
};

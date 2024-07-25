import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const registerUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, password });
    return response.data;
  } catch (error) {
    console.error('Error registering user', error);
    throw error;
  }
};

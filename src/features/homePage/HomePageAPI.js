// src/features/homePage/HomePageAPI.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export const getUserDetails = async () => {
  const response = await api.get('/userDetails');
  return response.data;
};

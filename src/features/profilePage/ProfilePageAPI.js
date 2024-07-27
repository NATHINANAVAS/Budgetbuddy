// src/features/profilePage/ProfilePageAPI.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export const createUserAPI = async (userData) => {
  const response = await api.post('/users', userData);
  return response.data;
};

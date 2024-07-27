// src/features/transactionPage/TransactionPageAPI.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export const fetchCategoriesAPI = async () => {
  const response = await api.get('/categories');
  return response.data;
};

export const fetchUsersAPI = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const fetchTransactionsAPI = async (filters) => {
  const response = await api.get('/transactions', { params: filters });
  return response.data;
};

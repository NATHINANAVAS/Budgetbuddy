// src/features/expensePage/ExpensePageAPI.js
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

export const createExpenseAPI = async (expense) => {
    const response = await api.post('/expenses', expense);
    return response.data;
};

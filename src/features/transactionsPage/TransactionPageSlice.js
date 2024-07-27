// src/features/transactionPage/TransactionPageSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCategoriesAPI, fetchUsersAPI, fetchTransactionsAPI } from './TransactionPageAPI';

export const fetchInitialData = createAsyncThunk(
  'transactionPage/fetchInitialData',
  async () => {
    const [categories, users, transactions] = await Promise.all([
      fetchCategoriesAPI(),
      fetchUsersAPI(),
      fetchTransactionsAPI({}),
    ]);
    return { categories, users, transactions };
  }
);

export const fetchTransactions = createAsyncThunk(
  'transactionPage/fetchTransactions',
  async (filters) => {
    const transactions = await fetchTransactionsAPI(filters);
    return transactions;
  }
);

const transactionPageSlice = createSlice({
  name: 'transactionPage',
  initialState: {
    categories: [],
    users: [],
    transactions: [],
    filteredTransactions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInitialData.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories;
        state.users = action.payload.users;
        state.transactions = action.payload.transactions;
        state.filteredTransactions = action.payload.transactions;
      })
      .addCase(fetchInitialData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredTransactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default transactionPageSlice.reducer;

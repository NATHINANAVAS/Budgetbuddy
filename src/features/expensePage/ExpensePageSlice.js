// src/features/expensePage/ExpensePageSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCategoriesAPI, fetchUsersAPI, createExpenseAPI } from './ExpensePageAPI';

export const fetchInitialData = createAsyncThunk(
  'expensePage/fetchInitialData',
  async () => {
    const [categories, users] = await Promise.all([fetchCategoriesAPI(), fetchUsersAPI()]);
    return { categories, users };
  }
);

export const createExpense = createAsyncThunk(
  'expensePage/createExpense',
  async (expense) => {
    const response = await createExpenseAPI(expense);
    return response;
  }
);

const expensePageSlice = createSlice({
  name: 'expensePage',
  initialState: {
    categories: [],
    users: [],
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
      })
      .addCase(fetchInitialData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExpense.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default expensePageSlice.reducer;

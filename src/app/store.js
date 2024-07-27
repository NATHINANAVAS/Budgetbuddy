import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import ExpensePageSlice from '../features/expensePage/ExpensePageSlice';
import TransactionPageSlice from '../features/transactionsPage/TransactionPageSlice';
import ProfilePageSlice from '../features/profilePage/ProfilePageSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    expensePage: ExpensePageSlice,
    transactionPage: TransactionPageSlice,
    profilePage: ProfilePageSlice
  },
});

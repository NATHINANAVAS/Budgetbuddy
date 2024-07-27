// src/features/expensePage/ExpensePage.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Box, Typography, MenuItem } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { fetchInitialData, createExpense } from './ExpensePageSlice';
import styles from './ExpensePage.module.css';

const ExpensePage = () => {
  const dispatch = useDispatch();
  const { categories, users, loading, error } = useSelector((state) => state.expensePage);
  const [category, setCategory] = useState('');
  const [user, setUser] = useState('');
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [expenseDate, setExpenseDate] = useState(dayjs());

  useEffect(() => {
    dispatch(fetchInitialData());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !user || !amount || !title || !expenseDate) {
      alert('Please fill out all required fields.');
      return;
    }
    dispatch(createExpense({ category, user, amount, title, description, expense_date: expenseDate.toISOString() })).then(() => {
      // Clear form fields
      setCategory('');
      setUser('');
      setAmount('');
      setTitle('');
      setDescription('');
      setExpenseDate(dayjs());
    });
  };

  return (
    <div className={styles.container}>
      <Box mt={5}>
        <Typography variant="h4" mb={3}>Expense</Typography>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
          />
          <TextField
            select
            fullWidth
            label="Enter Category"
            variant="outlined"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            margin="normal"
            required
          >
            {categories.map((cat, index) => (
              <MenuItem key={index} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            fullWidth
            label="Select User"
            variant="outlined"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            margin="normal"
            required
          >
            {users.map((userItem, index) => (
              <MenuItem key={index} value={userItem.id}>
                {userItem.first_name} {userItem.last_name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Amount"
            variant="outlined"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            margin="normal"
            required
            inputProps={{ min: "0", step: "0.01" }} // Ensures the input is numeric
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Expense Date"
              value={expenseDate}
              onChange={(newValue) => setExpenseDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" required />}
            />
          </LocalizationProvider>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default ExpensePage;

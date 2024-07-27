// src/features/transactionPage/TransactionPage.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Box, Typography, MenuItem, Button, Grid } from '@mui/material';
import { fetchInitialData, fetchTransactions } from './TransactionPageSlice';
import TransactionChart from './TransactionChart';
import styles from './TransactionPage.module.css';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const TransactionPage = () => {
  const dispatch = useDispatch();
  const { categories, users, transactions, filteredTransactions, loading, error } = useSelector((state) => state.transactionPage);
  const [month, setMonth] = useState('');
  const [category, setCategory] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    dispatch(fetchInitialData());
  }, [dispatch]);

  const handleFilter = () => {
    const filterParams = {};
    if (user) filterParams.user = user;
    if (category) filterParams.category = category;
    if (month) filterParams.month = months.indexOf(month) + 1;
    dispatch(fetchTransactions(filterParams));
  };

  return (
    <Box mt={5} className={styles.container}>
      <Typography variant="h4" mb={3}>Transactions</Typography>
      <Grid container spacing={1} alignItems="center" className={styles.filters}>
        <Grid item xs={12} md={2} className={styles.filterItem}>
          <TextField
            select
            label="Month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
            margin="normal"
          >
            <MenuItem value="">
              <em>All Months</em>
            </MenuItem>
            {months.map((monthName, index) => (
              <MenuItem key={index} value={monthName}>
                {monthName}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={2} className={styles.filterItem}>
          <TextField
            select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
            margin="normal"
          >
            <MenuItem value="">
              <em>All Categories</em>
            </MenuItem>
            {categories.map((cat, index) => (
              <MenuItem key={index} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={2} className={styles.filterItem}>
          <TextField
            select
            label="User"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
            margin="normal"
          >
            <MenuItem value="">
              <em>All Users</em>
            </MenuItem>
            {users.map((userItem, index) => (
              <MenuItem key={index} value={userItem.id}>
                {userItem.first_name} {userItem.last_name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={2} className={styles.filterItem}>
          <Button variant="contained" color="primary" onClick={handleFilter} fullWidth>
            Filter
          </Button>
        </Grid>
      </Grid>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <Box className={styles.tableChartContainer}>
        <Box className={styles.tableContainer}>
          <table className={styles.transactionTable}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Category</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.title}</td>
                  <td>{transaction.amount}</td>
                  <td>{new Date(transaction.expense_date).toLocaleDateString()}</td>
                  <td>{transaction.category}</td>
                  <td>{transaction.first_name} {transaction.last_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
        <Box className={styles.chartContainer}>
          <TransactionChart transactions={filteredTransactions} />
        </Box>
      </Box>
    </Box>
  );
};

export default TransactionPage;

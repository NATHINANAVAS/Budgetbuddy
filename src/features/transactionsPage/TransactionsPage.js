import React, { useState, useEffect } from 'react';
import { TextField, Box, Typography, MenuItem } from '@mui/material';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const TransactionPage = () => {
  const [month, setMonth] = useState('May');
  const [category, setCategory] = useState('Grocery');
  const [categories, setCategories] = useState([]);
  const [transactions] = useState([
    { month: 'May', category: 'Grocery', amount: 0 }
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleMonthChange = (e) => setMonth(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);

  return (
    <Box mt={5}>
      <Typography variant="h4" mb={3}>Transactions</Typography>
      <Box mb={3}>
        <TextField
          select
          label="Select Month"
          value={month}
          onChange={handleMonthChange}
          fullWidth
          variant="outlined"
          margin="normal"
        >
          {months.map((monthName, index) => (
            <MenuItem key={index} value={monthName}>
              {monthName}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Category"
          value={category}
          onChange={handleCategoryChange}
          fullWidth
          variant="outlined"
          margin="normal"
        >
          {categories.map((cat, index) => (
            <MenuItem key={index} value={cat.name}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>
        

      </Box>
      <Typography variant="h6">Amount: {transactions.find(t => t.month === month && t.category === category)?.amount || 0}</Typography>
    </Box>
  );
};

export default TransactionPage;

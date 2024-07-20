import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, MenuItem } from '@mui/material';



const ExpensePage = () => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8080/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);





  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Expense:', { category, amount });
  };

  return (
    <Box mt={5}>
      <Typography variant="h4" mb={3}>Expense</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          select
          fullWidth
          label="Enter Category"
          variant="outlined"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          margin="normal"
        >
          {categories.map((cat, index) => (
            <MenuItem key={index} value={cat.name}>
              {cat.name}
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
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ExpensePage;

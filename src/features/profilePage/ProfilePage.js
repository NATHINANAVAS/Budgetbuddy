// src/features/profilePage/ProfilePage.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Box, Typography } from '@mui/material';
import { createUser } from './ProfilePageSlice';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.profilePage);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [income, setIncome] = useState('');
  const [expectedSaving, setExpectedSaving] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser({ firstName, lastName, income, expectedSaving })).then(() => {
      // Clear form fields
      setFirstName('');
      setLastName('');
      setIncome('');
      setExpectedSaving('');
    });
  };

  return (
    <div className={styles.container}>
      <Box mt={5}>
        <Typography variant="h4" mb={3}>Profile</Typography>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Income"
            variant="outlined"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Expected Saving"
            variant="outlined"
            value={expectedSaving}
            onChange={(e) => setExpectedSaving(e.target.value)}
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default ProfilePage;

import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const ProfilePage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [income, setIncome] = useState('');
  const [expectedSaving, setExpectedSaving] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile:', { firstName, lastName, income, expectedSaving });
  };

  return (
    <Box mt={5}>
      <Typography variant="h4" mb={3}>Profile</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Last Name"
          variant="outlined"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Income"
          variant="outlined"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Expected Saving"
          variant="outlined"
          value={expectedSaving}
          onChange={(e) => setExpectedSaving(e.target.value)}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ProfilePage;

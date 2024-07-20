import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Menu from './features/menu/Menu';
import HomePage from './features/homePage/HomePage';
import ProfilePage from './features/profilePage/ProfilePage';
import ExpensePage from './features/expensePage/ExpensePage';
import TransactionPage from './features/transactionsPage/TransactionsPage';
import { Container } from '@mui/material';

function App() {
  return (
    <Router>
      <Menu />
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/expense" element={<ExpensePage />} />
        <Route path="/transactions" element={<TransactionPage />} />
        <Route path="/HomePage" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;

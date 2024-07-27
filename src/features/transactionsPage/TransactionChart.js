// src/features/transactionPage/TransactionChart.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TransactionChart = ({ transactions }) => {
  const data = transactions.map(transaction => ({
    title: transaction.title,
    amount: parseFloat(transaction.amount),
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="title" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#3f51b5" /> {/* Blue color scheme */}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TransactionChart;

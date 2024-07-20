import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './HomePage.module.css';

const data = [
  { name: 'Week 1', expense: 400 },
  { name: 'Week 2', expense: 300 },
  { name: 'Week 3', expense: 500 },
  { name: 'Week 4', expense: 900 },
];

const HomePage = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.title}>Budget Buddy</div>
        <div className={styles.caption}>Let's Plan and Save</div>
        <div className={styles.card}>
          <h3>You have --$ more</h3>
        </div>
        <div className={styles.card}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="expense" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

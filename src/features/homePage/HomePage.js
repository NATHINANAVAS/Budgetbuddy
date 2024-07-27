// src/features/homePage/HomePage.js
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getUserDetails } from './HomePageAPI';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserDetails();
        setUserDetails(data);

        const aggregatedData = data.map((user) => ({
          name: `${user.first_name} ${user.last_name}`,
          expenses: user.userExpenses,
          savingsLimit: user.income - user.expected_saving,
          status: user.remainingSavings < user.expected_saving ? 'Exceeded' : 'Within'
        }));
        setChartData(aggregatedData);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.title}>Budget Buddy</div>
        <div className={styles.caption}>Let's Plan and Save</div>
        <div className={styles.cards}>
          {userDetails.map((user) => {
            const cardClass = user.remainingSavings < user.expected_saving ? styles.red : styles.green;

            return (
              <div key={user.id} className={`${styles.userCard} ${cardClass}`}>
                <h3>{user.first_name} {user.last_name}</h3>
                <p>Income: ${user.income}</p>
                <p>Expected Savings: ${user.expected_saving}</p>
                <p>Expenses: ${user.userExpenses.toFixed(2)}</p>
                <p>Remaining Savings: ${user.remainingSavings.toFixed(2)}</p>
                <p>Status: {user.remainingSavings >= user.expected_saving ? 'Target Achieved' : 'Target Failed'}</p>
              </div>
            );
          })}
        </div>
        <div className={styles.chartCard}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="expenses" fill="#8884d8" />
              <Bar dataKey="savingsLimit" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

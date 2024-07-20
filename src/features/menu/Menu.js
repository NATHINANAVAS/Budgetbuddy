import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Menu.module.css';

const Menu = () => {
  return (
    <div className={styles.navBar}>
      <div className={styles.logo}>BudgetBuddy</div>
      <nav>
        
        <Link className={styles.navLink} to="/Homepage">Home</Link>
        <Link className={styles.navLink} to="/profile">Profile</Link>
        <Link className={styles.navLink} to="/expense">Expense</Link>
        <Link className={styles.navLink} to="/transactions">Transactions</Link>

      </nav>
    </div>
  );
};

export default Menu;

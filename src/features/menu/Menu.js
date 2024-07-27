import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Menu.module.css';

const Menu = () => {
  return (
    <div className={styles.navBar}>
      <div className={styles.logo}>BudgetBuddy</div>
      <nav>
        
        <NavLink className={styles.navLink} to="/Homepage" activeClassName="active">Home</NavLink>
        <NavLink className={styles.navLink} to="/profile" activeClassName="active">Profile</NavLink>
        <NavLink className={styles.navLink} to="/expense" activeClassName="active">Expense</NavLink>
        <NavLink className={styles.navLink} to="/transactions"activeClassName="active">Transactions</NavLink>

      </nav>
    </div>
  );
};

export default Menu;

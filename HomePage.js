import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={styles.container}>
      <nav style={styles.navBar}>
        <h1 style={styles.title}>Welcome to Wings Cafe Inventory System</h1>
      </nav>
      <div style={styles.buttonContainer}>
        <Link to="/dashboard" style={styles.button}>Go to Dashboard</Link>
        <Link to="/products" style={styles.button}>Manage Products</Link>
        <Link to="/users" style={styles.button}>Manage Users</Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#ffffff',
    padding: '20px',
    boxSizing: 'border-box',
  },
  navBar: {
    width: '100%',
    borderBottom: '3px solid #4CAF50',
    marginBottom: '20px',
    textAlign: 'center',
    padding: '10px 0',
  },
  title: {
    color: '#4CAF50',
    fontSize: '36px',
    margin: '0',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
  },
  button: {
    padding: '12px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center',
    transition: 'background-color 0.3s, transform 0.2s',
    width: '200px',
  },
};

export default HomePage;
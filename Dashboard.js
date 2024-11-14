import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard = () => {
  // Sample data for products and their availability percentages and prices
  const products = [
    { name: 'Banana', quantity: 59, price: 1.2 },
    { name: 'Apples', quantity: 34, price: 1.5 },
    { name: 'Papa', quantity: 68, price: 0.8 },
    { name: 'Kota', quantity: 45, price: 1.0 },
    { name: 'Chips', quantity: 90, price: 2.5 },
    { name: 'Drinks', quantity: 56, price: 1.8 },
  ];

  const totalStock = products.reduce((acc, product) => acc + product.quantity, 0);

  // Prepare data for the bar chart
  const chartData = {
    labels: products.map(product => product.name),
    datasets: [
      {
        label: 'Quantity Available',
        data: products.map(product => product.quantity),
        backgroundColor: 'rgba(76, 175, 80, 0.6)', // Light green color
        borderColor: 'rgba(56, 142, 60, 1)', // Darker green border
        borderWidth: 1,
      },
      {
        label: 'Price (M)',
        data: products.map(product => product.price),
        type: 'line', // This makes it a line chart
        borderColor: 'rgba(255, 165, 0, 1)', // Orange color for the line
        backgroundColor: 'rgba(255, 165, 0, 0.2)', // Light orange for area under the line
        borderWidth: 2,
        fill: true, // Fill under the line
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#4CAF50', // Green color for legend
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#4CAF50', // Green for x-axis ticks
          font: {
            size: 12,
          },
        },
      },
      y: {
        ticks: {
          color: '#4CAF50', // Green for y-axis ticks
          font: {
            size: 12,
          },
        },
        beginAtZero: true,
        max: Math.max(...products.map(p => p.quantity)) + 20, // Adjust based on quantity
      },
    },
  };

  return (
    <div style={styles.dashboardContainer}>
      <h2 style={styles.heading}>Wings Cafe Dashboard</h2>
      <p style={styles.totalStock}>Total Products in Stock: {totalStock}</p>
      <div style={styles.chartContainer}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

// Style object for the Dashboard
const styles = {
  dashboardContainer: {
    textAlign: 'center',
    padding: '40px 20px',
    margin: '20px auto',
    border: '1px solid #e0e0e0',
    borderRadius: '16px',
    backgroundColor: '#ffffff', // White background
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    maxWidth: '900px',
    width: '85%',
    boxSizing: 'border-box',
  },
  heading: {
    color: '#4CAF50', // Green for heading
    fontSize: '2.5em',
    fontWeight: 'bold',
    marginBottom: '15px',
    letterSpacing: '1px',
  },
  totalStock: {
    color: '#4CAF50', // Green for total stock
    fontSize: '1.5em',
    fontWeight: '500',
    marginBottom: '25px',
    backgroundColor: '#e8f5e9', // Light green background for total stock
    padding: '15px',
    borderRadius: '10px',
    display: 'inline-block',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  chartContainer: {
    padding: '20px',
    backgroundColor: 'rgba(244, 255, 244, 0.8)', // Light green chart background
    borderRadius: '16px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    height: '60vh', // Ensures the chart is responsive
    minHeight: '300px',
    overflow: 'hidden', // Prevent overflowing elements
  },
};

export default Dashboard;
// src/ProductManagement.jsx
import React, { useEffect, useState } from 'react';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    quantity: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5400/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newProduct.name && newProduct.category && newProduct.price && newProduct.quantity) {
      try {
        const response = await fetch('http://localhost:5400/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProduct),
        });
        await response.json();
        fetchProducts();  // Refresh the product list after adding
        setNewProduct({ name: '', category: '', description: '', price: '', quantity: '' });
      } catch (error) {
        console.error("Error adding product:", error);
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleUpdate = async (product) => {
    const updatedProduct = { ...product }; 
    // You might want to prompt the user for changes
    try {
      const response = await fetch(`http://localhost:5400/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });
      await response.json();
      fetchProducts(); // Refresh the product list after updating
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await fetch(`http://localhost:5400/products/${id}`, {
          method: 'DELETE',
        });
        fetchProducts(); // Refresh the product list after deleting
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Product Management</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="name" placeholder="Product Name" value={newProduct.name} onChange={handleChange} required style={styles.input} />
        <input type="text" name="category" placeholder="Category" value={newProduct.category} onChange={handleChange} required style={styles.input} />
        <input type="text" name="description" placeholder="Description" value={newProduct.description} onChange={handleChange} style={styles.input} />
        <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={handleChange} required style={styles.input} />
        <input type="number" name="quantity" placeholder="Quantity" value={newProduct.quantity} onChange={handleChange} required style={styles.input} />
        <button type="submit" style={styles.submitButton}>Add Product</button>
      </form>

      <h3 style={styles.subtitle}>List of Products Available</h3>
      {products.length === 0 ? (
        <p style={styles.noProducts}>No products available.</p>
      ) : (
        <table style={styles.table}>
          <thead style={styles.tableHeader}>
            <tr>
              <th style={styles.tableCell}>Name</th>
              <th style={styles.tableCell}>Category</th>
              <th style={styles.tableCell}>Description</th>
              <th style={styles.tableCell}>Price</th>
              <th style={styles.tableCell}>Quantity</th>
              <th style={styles.tableCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} style={styles.tableRow}>
                <td style={styles.tableCell}>{product.name}</td>
                <td style={styles.tableCell}>{product.category}</td>
                <td style={styles.tableCell}>{product.description}</td>
                <td style={styles.tableCell}>M {parseFloat(product.price).toFixed(2)}</td>
                <td style={styles.tableCell}>{product.quantity}</td>
                <td style={styles.tableCell}>
                  <button onClick={() => handleUpdate(product)} style={styles.actionButton}>Update</button>
                  <button onClick={() => handleDelete(product.id)} style={styles.deleteButton}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    maxWidth: '800px',
    margin: '0 auto', // Center horizontally
  },
  title: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '500px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    marginBottom: '30px',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  submitButton: {
    padding: '12px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    transition: 'background-color 0.3s',
  },
  subtitle: {
    fontSize: '20px',
    color: '#666',
    marginBottom: '10px',
  },
  noProducts: {
    fontSize: '16px',
    color: '#999',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  tableHeader: {
    backgroundColor: '#4CAF50',
  },
  tableCell: {
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'center',
    fontSize: '14px',
  },
  tableRow: {
    backgroundColor: '#f9f9f9',
    transition: 'background-color 0.2s',
  },
  actionButton: {
    padding: '5px 10px',
    margin: '0 5px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#3498db',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  deleteButton: {
    padding: '5px 10px',
    margin: '0 5px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default ProductManagement;
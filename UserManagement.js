import React, { useEffect, useState } from 'react';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null);

    useEffect(() => {
        fetchUsers();  // Fetch users when component mounts
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5400/users');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!user.username || !user.password) {
            setError('All required fields must be filled out');
            return;
        }

        try {
            if (isEditing) {
                const response = await fetch(`http://localhost:5400/users/${editingUserId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user)
                });
                if (!response.ok) {
                    throw new Error('Failed to update user');
                }
                setIsEditing(false);
            } else {
                const response = await fetch('http://localhost:5400/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user)
                });
                if (!response.ok) {
                    throw new Error('Failed to register user');
                }
            }
            fetchUsers(); // Refresh the users list after adding or updating
            setUser({ username: '', password: '' });
        } catch (error) {
            console.error("Error updating/adding user:", error);
            setError(error.message);
        }
    };

    const handleEditClick = (userData) => {
        setUser(userData);
        setIsEditing(true);
        setEditingUserId(userData.id);
    };

    const handleDeleteClick = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await fetch(`http://localhost:5400/users/${id}`, {
                    method: 'DELETE',
                });
                fetchUsers(); // Refresh the users list after deleting
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>User Management</h2>

            <form onSubmit={handleSubmit} style={styles.formContainer}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={user.username}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>
                    {isEditing ? 'Update User' : 'Add User'}
                </button>
                {error && <p style={styles.error}>{error}</p>}
            </form>

            <div style={styles.userListContainer}>
                <h3 style={styles.userListHeading}>Registered Users</h3>
                {users.length > 0 ? (
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.tableHeader}>
                                <th style={styles.tableHeaderCell}>Username</th>
                                <th style={styles.tableHeaderCell}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u.id} style={styles.tableRow}>
                                    <td style={styles.tableCell}>{u.username}</td>
                                    <td style={styles.tableCell}>
                                        <button
                                            onClick={() => handleEditClick(u)}
                                            style={styles.actionButton}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(u.id)}
                                            style={styles.deleteButton}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p style={styles.noUsers}>No registered users found.</p>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        color: '#333',
        fontSize: '24px',
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: '20px',
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        marginBottom: '20px',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        padding: '12px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        fontSize: '16px',
        outline: 'none',
        boxSizing: 'border-box',
    },
    button: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        marginTop: '10px',
        transition: 'background-color 0.3s ease',
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
    userListContainer: {
        marginTop: '30px',
    },
    userListHeading: {
        fontSize: '20px',
        fontWeight: '600',
        marginBottom: '15px',
        color: '#333',
        textAlign: 'center',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '5px',
        overflow: 'hidden',
    },
    tableHeader: {
        backgroundColor: '#4CAF50',
        color: '#fff',
        fontSize: '16px',
        fontWeight: '600',
    },
    tableHeaderCell: {
        padding: '10px',
        textAlign: 'left',
        fontSize: '16px',
    },
    tableRow: {
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
    },
    tableCell: {
        padding: '10px',
        textAlign: 'left',
        fontSize: '14px',
    },
    actionButton: {
        padding: '8px 12px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginRight: '5px',
        transition: 'background-color 0.3s ease',
    },
    deleteButton: {
        padding: '8px 12px',
        backgroundColor: '#f44336',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    noUsers: {
        textAlign: 'center',
        color: '#888',
        fontSize: '16px',
    },
};

export default UserManagement;
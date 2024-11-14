import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin, onRegister }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (isRegistering) {
            // Handle registration logic
            const successful = onRegister({ username, password });
            if (successful) {
                alert('Registration successful! You can now log in.');
                setIsRegistering(false); // switch back to login form
            } else {
                setError('User already exists!');
            }
        } else {
            // Handle login logic
            const successful = onLogin(username, password);
            if (successful) {
                navigate('/'); // redirect to home if login is successful
            } else {
                setError('Invalid username or password.');
            }
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>{isRegistering ? 'Register' : 'Login Here'}</h2>
            <form onSubmit={handleSubmit} style={styles.formContainer}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    required
                />
                <button type="submit" style={styles.button}>
                    {isRegistering ? 'Register' : 'Login'}
                </button>
            </form>

            <button onClick={() => setIsRegistering(!isRegistering)} style={styles.switchButton}>
                {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
            </button>

            {error && <p style={styles.errorText}>{error}</p>}
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '400px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    title: {
        textAlign: 'center',
        color: '#4CAF50',
        fontSize: '24px',
        marginBottom: '20px',
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    input: {
        width: '100%',
        padding: '12px',
        borderRadius: '6px',
        border: '1px solid #4CAF50',
        boxSizing: 'border-box',
    },
    button: {
        padding: '12px',
        border: 'none',
        borderRadius: '6px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    switchButton: {
        marginTop: '10px',
        padding: '10px',
        backgroundColor: 'transparent',
        border: 'none',
        color: '#4CAF50',
        cursor: 'pointer',
        textDecoration: 'underline',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: '10px',
    },
};

export default Login;